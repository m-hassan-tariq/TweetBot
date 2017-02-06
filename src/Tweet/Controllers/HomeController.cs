using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Collections;
using System.Net;
using System.IO;
using HtmlAgilityPack;
using Tweet.Model;
using Tweet.Entities;

namespace Tweet.Controllers
{
    public class HomeController : Controller
    {
        static HttpClient client = new HttpClient();

        public async Task<IActionResult> Index()
        {
            //news-api key = 2ebe11785ab349feb113416f738080bb
            //await GetNewsAsync("the-verge", "top", "450e3b01a89e427ab0f92fdb1cff27cb");
            //var twitter = new TwitterApi("KDNP8m1dTxettIJHF1AfqHcjE", "ZuJH7JiFU05hE8rrnpoPOK8V7bN5Es5a54tjmWzuQfzpteiH9N",
            //    "33008585-KtgQYIRn92HHq8xZ3yUpNbuzdoOOrtyNMVpRVoxTi", "aoDO9klJzjWKZDETVuVeNn0CxiJBF7019qh6TD0LZRaBc");
            //var response = await twitter.Tweet("Super Bowl 2017: How to watch the big game online - " + "http://www.theverge.com/2017/2/5/14503362/super-bowl-li-live-stream-watch-online-streaming-2017");
            return View();
        }

        public async Task<News> GetNewsAsync(string source, string sortBy, string apiKey)
        {
            try
            {
                News result = null;
                HttpResponseMessage response = await client.GetAsync("https://newsapi.org/v1/articles?source=" + source + "&sortBy=" + sortBy + "&apiKey=" + apiKey);
                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsAsync<News>();
                }
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
