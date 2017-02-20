using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;
using Tweet.Service;

namespace Tweet.BAL
{
    public class NewsData : INewsData
    {
        private readonly INewsService _newsService;

        public NewsData(INewsService newsService)
        {
            _newsService = newsService;
        }

        public async Task<News> GetNewsAsync(string mode, string source)
        {
            return await _newsService.GetNewsAsync(mode, source);
        }

        public async Task<List<Article>> GetAllNewsAsync(string mode)
        {
            List<Article> newsItem = null;

            foreach (var sourceEntity in BALConfig.Source.Split(BALConfig.SourceSplitter))
            {
                News result = await _newsService.GetNewsAsync(mode, sourceEntity);
                if(result != null)
                {
                    newsItem.AddRange(result.articles);
                }
            }
             
            return newsItem;
        }
    }
}
