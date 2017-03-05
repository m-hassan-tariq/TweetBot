using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tweet.BAL;
using Tweet.Entities;
using System.Net;
using System.IO;
using Microsoft.Extensions.Options;

namespace Tweet.Controllers
{
    [Route("api/[controller]")]
    public class TweetController : Controller
    {
        private readonly INewsRepository _newsData;
        private readonly ITwitterRepository _twitter;
        private readonly IOptions<BALSettings> _balSettings;

        public TweetController(INewsRepository newsData, ITwitterRepository twitter, IOptions<BALSettings> balSettings)
        {
            _newsData = newsData;
            _twitter = twitter;
            _balSettings = balSettings;
        }

        [HttpGet]
        [Route("LastUpdatedDateTime")]
        public IList<string> GetLastUpdatedDateTime()
        {
            var lastUpdateTime = new List<string>();
            lastUpdateTime.Add(_balSettings.Value.LastTweetUpdatedTime);
            lastUpdateTime.Add(_balSettings.Value.LatestNewsUpdatedTime);
            lastUpdateTime.Add(_balSettings.Value.TopNewsUpdatedTime);
            return lastUpdateTime;
        }

        [HttpGet]
        [Route("AllTopNews")]
        public async Task<IEnumerable<Article>> GetAllTopNews()
        {
            return await _newsData.GetAllNewsAsync("top", true);
        }

        [HttpGet]
        [Route("AllLatestNews")]
        public async Task<IEnumerable<Article>> GetAllLatestNews()
        {
            return await _newsData.GetAllNewsAsync("latest", true);
        }

        [HttpGet]
        [Route("AllSecondaryTopNews")]
        public async Task<IEnumerable<Article>> GetAllSecondaryTopNews()
        {
            return await _newsData.GetAllNewsAsync("top", false);
        }

        [HttpGet]
        [Route("AllSecondaryLatestNews")]
        public async Task<IEnumerable<Article>> GetAllSecondaryLatestNews()
        {
            return await _newsData.GetAllNewsAsync("latest", false);
        }

        [HttpGet]
        [Route("TopNews")]
        public async Task<News> GetTopNews(string source)
        {
            return await _newsData.GetNewsAsync(source, "top");
        }

        [HttpGet]
        [Route("LatestNews")]
        public async Task<News> GetLastestNews(string source)
        {
            return await _newsData.GetNewsAsync(source, "latest");
        }

        [HttpGet]
        [Route("PostTweet")]
        public async Task<TwitterResponse> PostTweet(string content)
        {
            return await _twitter.PostTweetAsync(content);
        }

        [HttpPost]
        [Route("PostSelectedNews")]
        public async Task<TwitterResponse> PostAllSelectedNews([FromBodyAttribute] List<Article> articleList)
        {
            return await _twitter.PostSelectedNewsAsync(articleList);
        }

        [HttpGet]
        [Route("PostLatestNews")]
        public async Task<TwitterResponse> PostLatestNewsTweet(string source)
        {
            return await _twitter.PostNewsTweetAsync(source, "latest");
        }

        [HttpGet]
        [Route("PostTopNews")]
        public async Task<TwitterResponse> PostTopNewsTweet(string source)
        {
            return await _twitter.PostNewsTweetAsync(source, "top");
        }

        [HttpGet]
        [Route("PostAllLatestNews")]
        public async Task<TwitterResponse> PostAllLatestNewsTweet()
        {
            return await _twitter.PostAllNewsTweetAsync("latest");
        }

        [HttpGet]
        [Route("PostAllTopNews")]
        public async Task<TwitterResponse> PostAllTopNewsTweet()
        {
            return await _twitter.PostAllNewsTweetAsync("top");
        }

        [HttpGet]
        [Route("PostAllBlog")]
        public async Task<TwitterResponse> PostAllBlogTweet()
        {
            return await _twitter.PostAllBlogTweetAsync();
        }

        [HttpGet]
        [Route("AllBlog")]
        public IEnumerable<BlogPost> GetAllBlogPosts()
        {
            return _newsData.LoadBlogPostsData();
        }

        [HttpGet]
        [Route("PostBlogByCategory")]
        public async Task<TwitterResponse> PostBlogTweetByCategoryAsync(string category)
        {
            return await _twitter.PostBlogTweetByCategoryAsync(category);
        }

        [HttpPost]
        [Route("PostSelectedBlog")]
        public async Task<TwitterResponse> PostAllSelectedBlogTweets([FromBodyAttribute] List<BlogPost> blogList)
        {
            return await _twitter.PostSelectedBlogTweetAsync(blogList);
        }
    }
}
