﻿namespace RacoonGo.Models
{
    public class Game
    {
        public string name { get; set; }
        public string description { get; set; }

        public int difficulty { get; set; }

        public string id { get; set; }

        public string email { get; set; }

        public bool hidden { get; set; }

    public int timesPlayed { get;set; }    

     public List<Question> questions { get; set; }
    }
}
