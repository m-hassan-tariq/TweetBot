using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.Service
{
    interface INewsService
    {
        Task<New> GetNewsAsync(string sortBy, string source);
    }
}
