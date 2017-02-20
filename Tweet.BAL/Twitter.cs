using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;
using Tweet.Service;

namespace Tweet.BAL
{
    public class Twitter : ITwitter
    {
        private readonly ITwitterService _twitterService;
        private readonly INewsData _newsData;
        private readonly string[] filterTerms = BALConfig.FilterTerms.Split(BALConfig.SourceSplitter);
        private readonly string[] hashtagTerms = BALConfig.FilterTerms.Split(BALConfig.SourceSplitter);

        public Twitter(ITwitterService twitterService, INewsData newsData)
        {
            _twitterService = twitterService;
            _newsData = newsData;
        }

        public async Task<TwitterResponse> PostTweetAsync(string tweet)
        {
            return await _twitterService.Tweet(tweet);
        }

        public async Task<TwitterResponse> PostNewsTweetAsync(string source, string mode)
        {
            var result = await _newsData.GetNewsAsync(source, mode);
            var response = new TwitterResponse();

            if (result != null)
            {
                foreach(var articleEntity in result.articles)
                {
                    if (!articleEntity.title.ContainsAny(filterTerms))
                    {
                        response = await _twitterService.Tweet(articleEntity.title.ReplaceKeywordsWithHashtags().LimitTo(150) + " " + articleEntity.url);
                    }

                }
            }
            return response;
        }

        public async Task<TwitterResponse> PostAllNewsTweetAsync(string mode)
        {
            var result = await _newsData.GetAllNewsAsync(mode);
            var response = new TwitterResponse();

            if (result != null)
            {
                foreach (var articleEntity in result)
                {
                    if (!articleEntity.title.ContainsAny(filterTerms))
                    {
                        response = await _twitterService.Tweet(articleEntity.title.ReplaceKeywordsWithHashtags().LimitTo(150) + " " + articleEntity.url);
                    }

                }
            }
            return response;
        }
    }
}
