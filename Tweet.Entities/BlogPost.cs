using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tweet.Entities
{
    public class BlogPost
    {
        public string header { get; set; }

        public string url { get; set; }

        public string category { get; set; }

        public string tag { get; set; }

        public DateTime createdDate { get; set; }
    }
}
