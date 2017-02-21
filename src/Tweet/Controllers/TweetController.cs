using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tweet.BAL;
using Tweet.Entities;

namespace Tweet.Controllers
{
    [Route("api/[controller]")]
    public class TweetController : Controller
    {
        private readonly INewsRepository _newsData;
        private readonly ITwitterRepository _twitter;

        public TweetController(INewsRepository newsData, ITwitterRepository twitter)
        {
            _newsData = newsData;
            _twitter = twitter;
        }

        [HttpGet]
        [Route("AllTopNews")]
        public async Task<IEnumerable<Article>> GetAllTopNews()
        {
            return await _newsData.GetAllNewsAsync("top");
        }

        [HttpGet]
        [Route("AllLatestNews")]
        public async Task<IEnumerable<Article>> GetAllLatestNews()
        {
            return await _newsData.GetAllNewsAsync("latest");
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

        [HttpGet]
        [Route("TweetLatestNews")]
        public async Task<TwitterResponse> PostLatestNewsTweet(string source)
        {
            return await _twitter.PostNewsTweetAsync(source, "latest");
        }

        [HttpGet]
        [Route("TweetTopNews")]
        public async Task<TwitterResponse> PostTopNewsTweet(string source)
        {
            return await _twitter.PostNewsTweetAsync(source, "top");
        }

        [HttpGet]
        [Route("TweetAllLatestNews")]
        public async Task<TwitterResponse> PostAllLatestNewsTweet()
        {
            return await _twitter.PostAllNewsTweetAsync("latest");
        }

        [HttpGet]
        [Route("TweetAllTopNews")]
        public async Task<TwitterResponse> PostAllTopNewsTweet()
        {
            return await _twitter.PostAllNewsTweetAsync("top");
        }

        [HttpGet]
        [Route("TweetAllPost")]
        public async Task<TwitterResponse> PostAllBlogTweet()
        {
            return await _twitter.PostAllBlogTweetAsync();
        }

        [HttpGet]
        [Route("TweetPostByCategory")]
        public async Task<TwitterResponse> PostBlogTweetByCategoryAsync(string category)
        {
            return await _twitter.PostBlogTweetByCategoryAsync(category);
        }
    }
}
