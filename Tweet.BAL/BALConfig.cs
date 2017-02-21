using System;
using System.Configuration;

namespace Tweet.BAL
{
    public static class BALConfig
    {
        private static string _source;
        private static string _sourceSplitter;
        private static string _filterTerms;
        private static string _addHashTagTerms;

        public static string Source
        {
            get
            {
                if (string.IsNullOrEmpty(_source))
                    _source = ConfigurationManager.AppSettings["Source"];
                return _source;
            }
        }

        public static string SourceSplitter
        {
            get
            {
                if (string.IsNullOrEmpty(_sourceSplitter))
                    _sourceSplitter = ConfigurationManager.AppSettings["SourceSplitter"];
                return _sourceSplitter;
            }
        }

        public static string FilterTerms
        {
            get
            {
                if (string.IsNullOrEmpty(_filterTerms))
                    _filterTerms = ConfigurationManager.AppSettings["FilterTerms"];
                return _filterTerms;
            }
        }

        public static string AddHashTagTerms
        {
            get
            {
                if (string.IsNullOrEmpty(_addHashTagTerms))
                    _addHashTagTerms = ConfigurationManager.AppSettings["AddHashTagTerms"];
                return _addHashTagTerms;
            }
        }
    }
}
