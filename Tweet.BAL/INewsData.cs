using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.BAL
{
    public interface INewsData
    {
        Task<News> GetNewsAsync(string mode, string source);

        Task<List<Article>> GetAllNewsAsync(string mode);
    }
}
