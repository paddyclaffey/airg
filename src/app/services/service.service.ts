import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICourse, ICourseResponse, ICoursesResponse, IEvent, ILeaderboard, ILeaderboardResponse } from '../models/golf';
import { map, switchMap, take } from 'rxjs/operators';

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
    return this.http.get<ILeaderboardResponse>(`${this.url}events/${event_id}/leaderboard/`, { headers }).pipe(
      map(res => res.data),
      switchMap(players => {
        const playerInfoObservables = players.map(player => this.getPlayerInfo(event_id, player.player_id));
        return forkJoin(playerInfoObservables).pipe(
          map(playerInfo => {
            // Enrich original list with player information
            return players.map((player, index) => ({
              ...player,
              info: playerInfo[index]
            }));
          })
        );
      })
    );
  }

  private getPlayerInfo(eventId_number, player_id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.authorizationToken);
    
    return this.http.get<any>(`${this.url}players/${player_id}/`, { headers }).pipe(map( response => response.data));
  }
}


