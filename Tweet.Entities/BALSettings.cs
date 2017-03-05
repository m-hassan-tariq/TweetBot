namespace Tweet.Entities
{
    public class BALSettings
    {
        public string LastTweetUpdatedTime { get; set; }
        public string LatestNewsUpdatedTime { get; set; }
        public string TopNewsUpdatedTime { get; set; }
        public string Source { get; set; }
        public string SecondarySource { get; set; }
        public string SourceSplitter { get; set; }
        public string AddHashTagTerms { get; set; }
        public string FilterTerms { get; set; }
    }
}
