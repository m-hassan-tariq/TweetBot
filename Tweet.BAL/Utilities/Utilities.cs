using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tweet.BAL
{
    public static class Utilities
    {
        public static string LimitTo(this string data, int length)
        {
            return (data == null || data.Length < length)
              ? data
              : data.Substring(0, length);
        }

        public static bool ContainsAny(this string data, params string[] filterTerms)
        {
            foreach (string term in filterTerms)
            {
                if (data.Contains(term))
                    return true;
            }
            return false;
        }

        public static string ReplaceKeywordsWithHashtags(this string data, params string[] filterTerms)
        {
            foreach (string term in filterTerms)
            {
                if (data.Contains(term))
                    return data.Replace(term, '#' + term);
            }
            return data;
        }

    }
}
