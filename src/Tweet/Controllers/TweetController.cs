using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tweet.BAL;
using Tweet.Entities;
using System.Net;
using System.IO;

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

        //public void hello()
        //{
        //    var timelineFormat = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={0}&include_rts=1&exclude_replies=1&count=5";
        //    var timelineUrl = string.Format(timelineFormat, 'hasan_tariq');
        //    HttpWebRequest timeLineRequest = (HttpWebRequest)WebRequest.Create(timelineUrl);
        //    var timelineHeaderFormat = "{0} {1}";
        //    timeLineRequest.Headers.Add("Authorization", string.Format(timelineHeaderFormat, twitAuthResponse.token_type, twitAuthResponse.access_token));
        //    timeLineRequest.Method = "Get";
        //    WebResponse timeLineResponse = timeLineRequest.GetResponse();
        //    var timeLineJson = string.Empty;
        //    using (timeLineResponse)
        //    {
        //        using (var reader = new StreamReader(timeLineResponse.GetResponseStream()))
        //        {
        //            timeLineJson = reader.ReadToEnd();
        //        }
        //    }
        //}
    }
}
