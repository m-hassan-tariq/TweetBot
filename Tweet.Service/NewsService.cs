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
        static string mainURL;

        public NewsService()
        {
            client = new HttpClient();
        }

        public async Task<New> GetNewsAsync(string sortBy, string source)
        {
            try
            {
                New result = null;
                string newsUrl = composeUrl(sortBy, source);
                HttpResponseMessage response = await client.GetAsync(newsUrl);
                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsAsync<New>();
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
