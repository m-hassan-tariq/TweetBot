using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.Service
{
    public interface ITwitterService
    {
        Task<TwitterResponse> Tweet(string tweetContent);
    }
}
