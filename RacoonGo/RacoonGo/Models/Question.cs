﻿namespace RacoonGo.Models
{
    public class Question
    {
        public string title { get; set; }
        public int corrects { get; set; }

        public int points { get; set; }

        public List<Option> options { get; set; }
    }
}
