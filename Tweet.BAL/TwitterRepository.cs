using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
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
                return await FormatFilterTweet(articleList);
            }
            SetUpdatedDateTime("");
            return new TwitterResponse();
        }

        public async Task<TwitterResponse> PostNewsTweetAsync(string source, string sortBy)
        {
            var result = await _newsData.GetNewsAsync(source, sortBy);

            if (result != null)
            {
                return await FormatFilterTweet(result.articles);
            }
            SetUpdatedDateTime("");
            return new TwitterResponse();
        }

        public async Task<TwitterResponse> PostAllNewsTweetAsync(string sortBy)
        {
            var result = await _newsData.GetAllNewsAsync(sortBy, true);

            if (result != null)
            {
                return await FormatFilterTweet(result);
            }
            SetUpdatedDateTime(sortBy);
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
            if (mode == "latest")
                _balSettings.Value.LatestNewsUpdatedTime = _balSettings.Value.LastTweetUpdatedTime  = current.ToString();
            else if (mode == "top")
                _balSettings.Value.TopNewsUpdatedTime = _balSettings.Value.LastTweetUpdatedTime = current.ToString();
            else
                _balSettings.Value.LastTweetUpdatedTime = current.ToString();
        }
    }
}
