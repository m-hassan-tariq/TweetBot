﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.Service
{
    public class NewsService : INewsService
    {
        static HttpClient client;

        public NewsService()
        {
            client = new HttpClient();
        }

        public async Task<News> GetNewsAsync(string sortBy, string source)
        {
            try
            {
                News result = null;
                string newsUrl = composeUrl(sortBy, source);
                HttpResponseMessage response = await client.GetAsync(newsUrl);
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

        public string composeUrl(string sortBy, string source)
        {
            return ServiceConfig.NewsMainUrl + source + "&sortBy=" + sortBy + "&apiKey=" + ServiceConfig.ApiKey;
        }
    }
}
