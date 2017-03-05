using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;
using Tweet.Service;

namespace Tweet.BAL
{
    public class TwitterRepository : ITwitterRepository
    {
        private readonly ITwitterService _twitterService;
        private readonly INewsRepository _newsData;
        private readonly IOptions<BALSettings> _balSettings;
        private readonly string[] filterTerms;
        private readonly string[] hashtagTerms;

        public TwitterRepository(ITwitterService twitterService, INewsRepository newsData, IOptions<BALSettings> balSettings)
        {
            _twitterService = twitterService;
            _newsData = newsData;
            _balSettings = balSettings;
            filterTerms = _balSettings.Value.FilterTerms.Split(';');
            hashtagTerms = _balSettings.Value.AddHashTagTerms.Split(';');
        }

        public async Task<TwitterResponse> PostTweetAsync(string tweet)
        {
            SetUpdatedDateTime("");
            return await _twitterService.Tweet(tweet);
        }

        public async Task<TwitterResponse> PostSelectedNewsAsync(List<Article> articleList)
        {
            if (articleList != null)
            {
                SetUpdatedDateTime("");
                return await FormatFilterTweet(articleList);
            }
            return new TwitterResponse();
        }

        public async Task<TwitterResponse> PostNewsTweetAsync(string source, string sortBy)
        {
            var result = await _newsData.GetNewsAsync(source, sortBy);

            if (result != null)
            {
                SetUpdatedDateTime("");
                return await FormatFilterTweet(result.articles);
            }
            return new TwitterResponse();
        }

        public async Task<TwitterResponse> PostAllNewsTweetAsync(string sortBy)
        {
            var result = await _newsData.GetAllNewsAsync(sortBy, true);

            if (result != null)
            {
                List<Article> lstUpdated = new List<Article>();
                LastUpdatedDateTime lastDateTime = GetUpdatedDateTime();
                DateTime lastUpdated = sortBy == "latest" ? DateTime.Parse(lastDateTime.LatestNewsUpdatedTime) : DateTime.Parse(lastDateTime.TopNewsUpdatedTime);

                foreach (var item in result)
                {
                    DateTime publishedDate;
                    if (!DateTime.TryParse(item.publishedAt, out publishedDate)){
                        lstUpdated.Add(item);
                    }
                    else{
                        if (publishedDate > lastUpdated)
                            lstUpdated.Add(item);
                    }
                }

                SetUpdatedDateTime(sortBy);
                return await FormatFilterTweet(lstUpdated);
            }
            return new TwitterResponse();
        }

        public async Task<TwitterResponse> FormatFilterTweet(List<Article> result)
        {
            var response = new TwitterResponse();

            foreach (var articleEntity in result)
            {
                if (!articleEntity.title.ContainsAny(filterTerms))
                {
                    response = await _twitterService.Tweet(articleEntity.title.ReplaceKeywordsWithHashtags(hashtagTerms).LimitTo(100) + " " + articleEntity.url);
                }
            }
            return response;
        }

        public async Task<TwitterResponse> PostAllBlogTweetAsync()
        {
            var result = _newsData.LoadBlogPostsData();

            return await PostBlogTweetAsync(result);
        }

        public async Task<TwitterResponse> PostBlogTweetByCategoryAsync(string category)
        {
            var result = _newsData.LoadBlogPostsData()
                                    .Where(w => w.category == category)
                                    .ToList();

            return await PostBlogTweetAsync(result);
        }

        public async Task<TwitterResponse> PostSelectedBlogTweetAsync(List<BlogPost> blogList)
        {
            if (blogList != null)
            {
                return await PostBlogTweetAsync(blogList);
            }
            return new TwitterResponse();
        }

        public async Task<TwitterResponse> PostBlogTweetAsync(List<BlogPost> result)
        {
            var response = new TwitterResponse();

            foreach (var postEntity in result)
            {
                if (!postEntity.header.ContainsAny(filterTerms))
                {
                    response = await _twitterService.Tweet(postEntity.header.ReplaceKeywordsWithHashtags(hashtagTerms).LimitTo(100) + " " + postEntity.url);
                }

            }
            SetUpdatedDateTime("");
            return response;
        }

        public void SetUpdatedDateTime(string mode)
        {
            DateTime current = DateTime.UtcNow;
            current = current.AddHours(-8);

            LastUpdatedDateTime lastDateTime = GetUpdatedDateTime();

            if (mode == "latest")
                lastDateTime.LatestNewsUpdatedTime = lastDateTime.LastTweetUpdatedTime = current.ToString();
            else if (mode == "top")
                lastDateTime.TopNewsUpdatedTime = lastDateTime.LastTweetUpdatedTime = current.ToString();
            else
                lastDateTime.LastTweetUpdatedTime = current.ToString();

            string output = JsonConvert.SerializeObject(lastDateTime, Formatting.Indented);
            File.WriteAllText("lastUpdatedDateTime.json", output);
        }

        public LastUpdatedDateTime GetUpdatedDateTime()
        {
            string fileData = File.ReadAllText("lastUpdatedDateTime.json");
            return JsonConvert.DeserializeObject<LastUpdatedDateTime>(fileData);
        }
    }
}
