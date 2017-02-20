using System.Configuration;

namespace Tweet.Service
{
    public static class ServiceConfig
    {
        private static string _newsMainUrl;
        private static string _apiKey;
        private static string _twitterApiUrl;
        private static string _sendTweetApiPath;
        private static string _consumerKey;
        private static string _consumerKeySecret;
        private static string _accessToken;
        private static string _accessTokenSecret;
        private static bool? _enableErrorLog;

        public static string NewsMainUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_newsMainUrl))
                    _newsMainUrl = ConfigurationManager.AppSettings["NewsMainUrl"];
                return _newsMainUrl;
            }
        }

        public static string ApiKey
        {
            get
            {
                if (string.IsNullOrEmpty(_apiKey))
                    _apiKey = ConfigurationManager.AppSettings["ApiKey"];
                return _apiKey;
            }
        }

        public static string TwitterApiUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_twitterApiUrl))
                    _twitterApiUrl = ConfigurationManager.AppSettings["TwitterApiUrl"];
                return _twitterApiUrl;
            }
        }

        public static string SendTweetApiPath
        {
            get
            {
                if (string.IsNullOrEmpty(_sendTweetApiPath))
                    _sendTweetApiPath = ConfigurationManager.AppSettings["SendTweetApiPath"];
                return _sendTweetApiPath;
            }
        }

        public static string ConsumerKey
        {
            get
            {
                if (string.IsNullOrEmpty(_consumerKey))
                    _consumerKey = ConfigurationManager.AppSettings["ConsumerKey"];
                return _consumerKey;
            }
        }

        public static string ConsumerKeySecret
        {
            get
            {
                if (string.IsNullOrEmpty(_consumerKeySecret))
                    _consumerKeySecret = ConfigurationManager.AppSettings["ConsumerKeySecret"];
                return _consumerKeySecret;
            }
        }

        public static string AccessToken
        {
            get
            {
                if (string.IsNullOrEmpty(_accessToken))
                    _accessToken = ConfigurationManager.AppSettings["AccessToken"];
                return _accessToken;
            }
        }

        public static string AccessTokenSecret
        {
            get
            {
                if (string.IsNullOrEmpty(_accessTokenSecret))
                    _accessTokenSecret = ConfigurationManager.AppSettings["AccessTokenSecret"];
                return _accessTokenSecret;
            }
        }
    }
}
