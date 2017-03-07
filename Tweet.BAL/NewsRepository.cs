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

        public async Task<List<Article>> GetAllNewsAsync(string sortBy, bool isPrimarySource)
        {
            List<Article> newsItem = new List<Article>();

            var source = isPrimarySource == true ? _balSettings.Value.Source : _balSettings.Value.SecondarySource;

            foreach (var sourceEntity in source.Split(';'))
            {
                News result = await _newsService.GetNewsAsync(sourceEntity.Trim(), sortBy);

                if (result != null)
                {
                    foreach (var item in result.articles)
                    {
                        item.source = result.source;
                        DateTime publishedDate;
                        if (!DateTime.TryParse(item.publishedAt, out publishedDate))
                        {
                            item.publishedAt = DateTime.UtcNow.AddHours(-8).ToString();
                        }
                        else
                        {
                            if (!publishedDate.ToString().Contains("1/1/0001"))
                                item.publishedAt = publishedDate.AddHours(-8).ToString();
                            else
                                item.publishedAt = DateTime.UtcNow.AddHours(-8).ToString();
                        }
                    }
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
