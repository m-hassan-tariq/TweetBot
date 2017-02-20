using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Tweet.Entities;

namespace Tweet.Service
{
    public class TwitterService : ITwitterService
    {
        readonly HMACSHA1 sigHasher;
        readonly DateTime epochUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public TwitterService()
        {
            sigHasher = new HMACSHA1(new ASCIIEncoding().GetBytes(string.Format("{0}&{1}", ServiceConfig.ConsumerKeySecret, ServiceConfig.AccessTokenSecret)));
        }

        /// <summary>
        /// Sends a tweet with the supplied text and returns the response from the Twitter API.
        /// </summary>
        public Task<TwitterResponse> Tweet(string tweetContent)
        {
            var data = new Dictionary<string, string> {
                { "status", tweetContent },
                { "trim_user", "1" }
            };

            return SendRequest(data);
        }

        Task<TwitterResponse> SendRequest(Dictionary<string, string> data)
        {
            var fullUrl = ServiceConfig.TwitterApiUrl + ServiceConfig.SendTweetApiPath;

            // Timestamps are in seconds since 1/1/1970.
            var timestamp = (int)((DateTime.UtcNow - epochUtc).TotalSeconds);

            // Add all the OAuth headers we'll need to use when constructing the hash.
            data.Add("oauth_consumer_key", ServiceConfig.ConsumerKey);
            data.Add("oauth_signature_method", "HMAC-SHA1");
            data.Add("oauth_timestamp", timestamp.ToString());
            data.Add("oauth_nonce", "a"); // Required, but Twitter doesn't appear to use it, so "a" will do.
            data.Add("oauth_token", ServiceConfig.AccessToken);
            data.Add("oauth_version", "1.0");

            // Generate the OAuth signature and add it to our payload.
            data.Add("oauth_signature", GenerateSignature(fullUrl, data));

            // Build the OAuth HTTP Header from the data.
            string oAuthHeader = GenerateOAuthHeader(data);

            // Build the form data (exclude OAuth stuff that's already in the header).
            var formData = new FormUrlEncodedContent(data.Where(kvp => !kvp.Key.StartsWith("oauth_")));

            return SendRequest(fullUrl, oAuthHeader, formData);
        }

        /// <summary>
        /// Generate an OAuth signature from OAuth header values.
        /// </summary>
        string GenerateSignature(string url, Dictionary<string, string> data)
        {
            var sigString = string.Join(
                "&",
                data
                    .Union(data)
                    .Select(kvp => string.Format("{0}={1}", Uri.EscapeDataString(kvp.Key), Uri.EscapeDataString(kvp.Value)))
                    .OrderBy(s => s)
            );

            var fullSigData = string.Format(
                "{0}&{1}&{2}",
                "POST",
                Uri.EscapeDataString(url),
                Uri.EscapeDataString(sigString.ToString())
            );

            return Convert.ToBase64String(sigHasher.ComputeHash(new ASCIIEncoding().GetBytes(fullSigData.ToString())));
        }

        /// <summary>
        /// Generate the raw OAuth HTML header from the values (including signature).
        /// </summary>
        string GenerateOAuthHeader(Dictionary<string, string> data)
        {
            return "OAuth " + string.Join(
                ", ",
                data
                    .Where(kvp => kvp.Key.StartsWith("oauth_"))
                    .Select(kvp => string.Format("{0}=\"{1}\"", Uri.EscapeDataString(kvp.Key), Uri.EscapeDataString(kvp.Value)))
                    .OrderBy(s => s)
            );
        }

        /// <summary>
        /// Send HTTP Request and return the response.
        /// </summary>
        async Task<TwitterResponse> SendRequest(string fullUrl, string oAuthHeader, FormUrlEncodedContent formData)
        {
            using (var http = new HttpClient())
            {
                http.DefaultRequestHeaders.Add("Authorization", oAuthHeader);

                var httpResp = await http.PostAsync(fullUrl, formData);
                var respBody = await httpResp.Content.ReadAsAsync<TwitterResponse>();

                return respBody;
            }
        }
    }
}
