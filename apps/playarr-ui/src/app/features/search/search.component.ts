import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SearchService } from './search.service';
import { GameResultDto } from '@playarr/shared-types';

@Component({
    selector: 'pa-search',
    template: `
    <div fxLayout="column" fxLayoutGap="16px">
      <mat-form-field appearance="outline">
        <mat-label>Search game repacks</mat-label>
        <input matInput [formControl]="queryControl" placeholder="Enter game name…" />
      </mat-form-field>

      <div *ngIf="results$ | async as results">
        <mat-list>
          <mat-list-item *ngFor="let game of results">
            <img matListAvatar [src]="game.coverUrl" alt="cover" />
            <div matLine>{{ game.title }}</div>
            <div matLine>Size: {{ game.size }} Seeds: {{ game.seeds }}</div>
            <button mat-mini-button color="primary" (click)="download(game)">Download</button>
          </mat-list-item>
        </mat-list>
      </div>

      <div *ngIf="(results$ | async)?.length === 0">
        <p>No results found.</p>
      </div>
    </div>
  `
})
export class SearchComponent implements OnInit {
    queryControl = new FormControl('');
    results$!: Observable<GameResultDto[]>;

    constructor(private svc: SearchService) {}

    ngOnInit() {
        this.results$ = this.queryControl.valueChanges.pipe(
            debounceTime(300),
            switchMap(q => this.svc.search(q))
        );
    }

    download(game: GameResultDto) {
        this.svc.download(game.magnet).subscribe();
    }
}
