﻿import { Theme } from "./app.enum";

export class BackEndResponse<T> {
    success!: boolean;
    data?: T;
    message?: any;
    meta?: any;
}

export class Game {
    public name!: string;
    public description !: string;
    public difficulty !: number;
    public id : string = "";
    public questions : Question[] = [];
    public hidden: boolean;
    public timesPlayed: number;
    public email!: string;
    
    constructor(id: string, name: string, description: string, difficulty: number, questions: Question[], email: string, hidden: boolean, timesPlayed: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.questions = questions;
        this.email = email;
        this.hidden = hidden;
        this.timesPlayed = timesPlayed;
    }
}

export class Question {
    public title!: string;
    public corrects !: number;
    public points !: number;
    public options : Option[] = [];

    constructor(title: string, points: number) {
        this.title = title;
        this.corrects = 0;
        this.points = points;
    }
}

export class Option {
    public body !: string;
    public correct!: boolean;

    constructor(body: string) {
        this.body = body;
        this.correct = false;
    }
}
export class Location {
    public name!: string;
    public lat!: number;
    public lon!: number;

    constructor(name: string, lat: number = 0, lon: number = 0) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

}

export class Event {
    public id!: string;
    public title!: string;
    public description!: string;
    public recommendedAge!: number;
    public startDate!: Date;
    public endDate!: Date;
    public themes!: number[];
    public location!: Location;
    public photoUrl !: string;
    public user !: CompanyUser;

    constructor(id: string,title: string, description: string, recommendedAge: number, startDate: Date, endDate: Date, location: Location, themes: Theme[] = [], photoUrl: string, user: CompanyUser) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.recommendedAge = recommendedAge;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.themes = themes;
        this.photoUrl = photoUrl;
        this.user = user;
    }
}

export class User {
    public email: string;
    public username: string;
    public score: number;
    constructor(email: string, username: string, score: number) {
        this.email = email;
        this.username = username;
        this.score = score;
    }
}

export class CompanyUser extends User{
    public website!: string;
    public phoneNumber!: string;
    public sponsored: Date;


    constructor(user: User, website: string, phoneNumber: string) {
        super(user.email, user.username, user.score);
        this.website = website;
        this.phoneNumber = phoneNumber;
        this.sponsored = new Date();
    }
}