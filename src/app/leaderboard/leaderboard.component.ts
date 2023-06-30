import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICourse, ILeaderboard } from '../models/golf';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  private readonly EVENT_ID = 1000;

  public players: ILeaderboard[];


  constructor(private serviceService: ServiceService,
              private router: Router) {
    this.players = [];
  }

  ngOnInit(): void {
    this.serviceService.getLeaderBoard(this.EVENT_ID)
      .pipe(takeUntil(this.destroy$)
    ).subscribe((leaderboard) => {
      this.players = leaderboard.sort((player1, player2) => {
        if (player1.score === player2.score) {
          return player2.thru - player1.thru;
        }

        return player1.score - player2.score;
      })
      console.log(this.players, leaderboard);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
