import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICourse, ICourseResponse, ICoursesResponse, IEvent, ILeaderboard, ILeaderboardResponse } from '../models/golf';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ServiceService {

  private readonly url: string;
  private readonly authorizationToken: string = 'DY2Z5BX9EX8PVFTAWH7G';
// MOVE TO HTTP INTECEPTOR
  constructor(private http: HttpClient) {
    this.url = 'https://golf-tech-test.airg.dev/api/1/';
  }

  getCourses(): Observable<ICourse[]> {
    const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
    return this.http.get<ICoursesResponse>(`${this.url}courses/`, { headers }).pipe(map( response => response.data));
  }

  getCourse(course_id: number): Observable<ICourse> {
    const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
    return this.http.get<ICourseResponse>(`${this.url}courses/${course_id}/`, { headers }).pipe(map( response => response.data));
  }

  getEvents(): Observable<ICourse[]> {
    const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
    return this.http.get<ICourse[]>(`${this.url}events/`, { headers });
  }

  getLeaderBoard(event_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
    return this.http.get<ILeaderboardResponse>(`${this.url}events/${event_id}/leaderboard/`, { headers }).pipe(map( response => {
      // const data = response.data;
      // const requests = [];
      // data.forEach( player => {
      //   requests.push(this.getPlayerInfo(event_id, player.player_id));
      // });
    
      // // call these, combinelatest txjs func
      // // on results, enhance the data on the original response
      // // return of(data)
      // return combineLatest(requests).pipe(take(1)).subscribe(allPlayersInfo => {
      //   console.log(allPlayersInfo);

      //   return data;
      // });
      return response.data;
    })); 
  }

  private getPlayerInfo(eventId_number, player_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
    
    return this.http.get<any>(`${this.url}events/${eventId_number}/player/${player_id}/`, { headers }).pipe(map( response => response.data));
  }
  // getLeaderBoard(event_id: number): Observable<ICourse[]> {
  //   const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
  //   return this.http.get<ICourse[]>(`${this.url}events/${event_id}/leaderboard`, { headers });
  // }

}