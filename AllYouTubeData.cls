public class AllYouTubeData {
    public string kind;

    public pageInfoClass pageInfo;

    public class pageInfoClass{
        public integer totalResult;
        public integer resultsPerPage;
    } 

    public item[] items;

    public class item{
        public string kind;
        public snippetClass snippet;
        public idclass id;
    }

    public class idclass{
        public string videoId;
    }

     public class snippetClass{
         public string publishedAT;
         public string title;
         public string description;
         public string channelTitle;
         public thumbnailsClass thumbnails;
     }

     public class thumbnailsClass{
         public mediumClass medium;
     }

     public class mediumClass{
         public string url;
     }


   /*
   string jsonstring='////'
   wrapperForJson wfj=(wrapperForJson)JSON.deserilize(jsonstring);
   system.debug(wfj.positions.values[0].compony.industry)
  */

}