using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.BAL
{
    public interface INewsRepository
    {
        Task<News> GetNewsAsync(string source, string sortBy);

        Task<List<Article>> GetAllNewsAsync(string mode, bool isPrimarySource);

        List<BlogPost> LoadBlogPostsData();
    }
}
