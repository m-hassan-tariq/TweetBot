using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.BAL
{
    public interface ITwitter
    {
        Task<TwitterResponse> PostTweetAsync(string tweet);

        Task<TwitterResponse> PostNewsTweetAsync(string source, string mode);

        Task<TwitterResponse> PostAllNewsTweetAsync(string mode);
    }
}
