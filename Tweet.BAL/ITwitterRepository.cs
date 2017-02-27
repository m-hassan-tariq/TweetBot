using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.BAL
{
    public interface ITwitterRepository
    {
        Task<TwitterResponse> PostTweetAsync(string tweet);

        Task<TwitterResponse> PostSelectedNewsAsync(List<Article> articleList);

        Task<TwitterResponse> PostNewsTweetAsync(string source, string sortBy);

        Task<TwitterResponse> PostAllNewsTweetAsync(string sortBy);

        Task<TwitterResponse> PostAllBlogTweetAsync();

        Task<TwitterResponse> PostBlogTweetByCategoryAsync(string category);

        Task<TwitterResponse> PostSelectedBlogTweetAsync(List<BlogPost> blogList);
    }
}
