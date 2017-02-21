using Microsoft.Extensions.Options;
using System;
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
        private readonly IOptions<ServiceSettings> _serviceSettings;

        public NewsService(IOptions<ServiceSettings> serviceSettings)
        {
            _serviceSettings = serviceSettings;
            client = new HttpClient();
        }

        public async Task<News> GetNewsAsync(string source, string sortBy)
        {
            try
            {
                News result = null;
                string newsUrl = composeUrl(source, sortBy);
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

        public string composeUrl(string source, string sortBy)
        {
            return _serviceSettings.Value.NewsMainUrl + source + "&sortBy=" + sortBy + "&apiKey=" + _serviceSettings.Value.NewsApiKey;
        }
    }
}
