import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {BackEndResponse, CompanyUser, Event, Game, User} from "../models/app.model";

@Injectable({
    providedIn: 'root'
})
export class BackendRouterService {
    private static readonly API_URL = 'https://localhost:7109/api/';

    // Headers
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
    });

    public endpoints: any;

    constructor(private http: HttpClient) {

        let context = this;
        this.endpoints = {
            event: {
                addEvent: function (event: Event) { return context.api_create('Events/addEvent',  event ) },
                getEvents: function () { return context.api_list('Events/events', {}) },
                getMyEvents: function (email: string) { return context.api_list('Events/myEvents', { email }) },
                deleteEvent: function (email: string, id: string) { return context.api_delete('Events/delete',  email+"&"+id ) },
                search: function (query: string) { return context.api_list('Events/search', { query }) },
                searchAdvance: function (event: Event) { return context.api_create('Events/searchAdvance', event)},
            },
            user: {
                addUser: function (user: User) { return context.api_create('Users', user) },
                signIn: function (email: string) { return context.api_list('Users', { email })},
                setSponsor: function (email: string, days: number) {
                    const request = {
                        email: email,
                        days: days
                    };
                    return context.api_create('Users/sponsor', request);
                },
                deleteAccount: function (email: string) { return context.api_delete('Users/delete', email) },
                setFinishedGame: function (user: User, game: Game) {
                    const request = {
                        user: user,
                        game: game
                    };
                    return context.api_create('Users/completeGame', request)
                }

            },
            company: {
                addCompany: function (company: CompanyUser) { return context.api_create('Company', company) },
                signIn: function (email: string) { return context.api_list("Company", {email} ) }
            },
            game: {
                addGame: function (game: Game) {   return context.api_create('Games',  game)},
                getGames: function () { return context.api_list('Games/games', {}) },
                getMyGames: function (email: string) { return context.api_list('Games/myGames', { email }) },
                search: function (query: string) { return context.api_list('Games/search', { query }) },
                searchAdvance: function (game: Game) { return context.api_create('Games/searchAdvance', game) },
                deleteGame: function (email: string, id: string) { return context.api_delete('Games/deleteGame', email+"&"+id) },
                statistics: function (id: string) { return context.api_single('Games/statistics', id) }
            }
        }
    }


    /******************* OPERACIONES API GENERICAS *******************/
    api_list(url: string, params: any): Observable<HttpResponse<BackEndResponse<any>>> {
        //if(params) this.clearParameters(params);
        url = BackendRouterService.API_URL + url;
        return this.http.get<any>(url, { observe: 'response', params, headers: this.headers });
    }

    api_single(url: string, id: string): Observable<HttpResponse<BackEndResponse<any>>> {
        url = BackendRouterService.API_URL + url + '/' + id;
        return this.http.get<any>(url, { observe: 'response', headers: this.headers });
    }

    api_create(url: string, data: any): Observable<HttpResponse<BackEndResponse<any>>> {
        url = BackendRouterService.API_URL + url;
        return this.http.post<any>(url, data, { observe: 'response', headers: this.headers });
    }

    api_update(url: string, id: string, data: any, property: string = ''): Observable<HttpResponse<BackEndResponse<any>>> {
        url = BackendRouterService.API_URL + url + '/' + id + property;
        return this.http.put<any>(url, data, { observe: 'response', headers: this.headers });
    }

    api_delete(url: string, id: string): Observable<HttpResponse<BackEndResponse<any>>> {
        url = BackendRouterService.API_URL + url + '/' + id;
        return this.http.delete<any>(url, { observe: 'response', headers: this.headers });
    }
}