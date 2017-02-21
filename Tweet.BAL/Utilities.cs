using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
                var item = term.Trim().ToLower();
                if (!string.IsNullOrEmpty(item))
                {
                    if (data.ToLower().Contains(term))
                        return true;
                }
            }
            return false;
        }

        public static string ReplaceKeywordsWithHashtags(this string data, params string[] filterTerms)
        {
            foreach (string term in filterTerms)
            {
                var item = term.Trim().ToLower();
                if (!string.IsNullOrEmpty(item))
                {
                    if (data.ToLower().Contains(item))
                    {
                        data = Regex.Replace(data, item, '#' + item, RegexOptions.IgnoreCase);
                    }  
                }
            }
            return data;
        }
    }
}
