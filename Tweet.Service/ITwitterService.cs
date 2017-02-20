using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tweet.Service
{
    interface ITwitterService
    {
        Task<string> Tweet(string tweetContent);
    }
}
