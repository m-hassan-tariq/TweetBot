using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
    public class NewsRepository : INewsRepository
    {
        private readonly INewsService _newsService;
        private readonly IOptions<BALSettings> _balSettings;

        public NewsRepository(INewsService newsService, IOptions<BALSettings> balSettings)
        {
            _newsService = newsService;
            _balSettings = balSettings;
        }

        public async Task<News> GetNewsAsync(string source, string sortBy)
        {
            return await _newsService.GetNewsAsync(source, sortBy);
        }

        public async Task<List<Article>> GetAllNewsAsync(string sortBy)
        {
            List<Article> newsItem = new List<Article>();

            foreach (var sourceEntity in _balSettings.Value.Source.Split(';'))
            {
                News result = await _newsService.GetNewsAsync(sourceEntity.Trim(), sortBy);
                if(result != null)
                {
                    newsItem.AddRange(result.articles);
                }
            }
             
            return newsItem;
        }

        public List<BlogPost> LoadBlogPostsData()
        {
            List<BlogPost> result = new List<BlogPost>();

            using (StreamReader data = new StreamReader("blogPosts.json"))
            {
                string json = data.ReadToEnd();
                result = JsonConvert.DeserializeObject<List<BlogPost>>(json);
            }

            return result;
        }
    }
}
