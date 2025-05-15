import { Component, OnInit } from '@angular/core';
import { LibraryService } from './library.service';
import { GameDto } from '@playarr/shared-types';

@Component({
    selector: 'pa-library',
    template: `
    <h2>Game Library</h2>
    <div fxLayout="row wrap" fxLayoutGap="16px">
      <mat-card *ngFor="let game of games" fxFlex="100" fxFlex.gt-sm="45" fxFlex.gt-lg="30" class="library__card">
        <img mat-card-image [src]="game.localCoverPath || game.coverUrl" alt="Cover art" />
        <mat-card-content>
          <h3>{{ game.title }}</h3>
          <p>{{ game.summary }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="refresh(game)">Refresh Metadata</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
    styles: [`
    .library__card { margin-bottom: 16px; }
  `]
})
export class LibraryComponent implements OnInit {
    games: GameDto[] = [];

    constructor(private svc: LibraryService) {}

    ngOnInit() {
        this.load();
    }

    load() {
        this.svc.list().subscribe(g => this.games = g);
    }

    refresh(game: GameDto) {
        this.svc.enrich(game.hash, game.title).subscribe(() => this.load());
    }
}
