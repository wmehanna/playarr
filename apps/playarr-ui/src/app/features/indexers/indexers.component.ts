import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IndexersService } from './indexers.service';
import { FeedDto } from '@playarr/shared-types';

@Component({
    selector: 'pa-indexers',
    template: `
        <h2>Indexers</h2>
        <form [formGroup]="form" (ngSubmit)="add()">
            <input formControlName="name" placeholder="Name" required />
            <input formControlName="url" placeholder="Feed URL" required />
            <input formControlName="priority" type="number" placeholder="Priority" required />
            <button type="submit">{{ editingId ? 'Update' : 'Add' }}</button>
        </form>

        <table mat-table [dataSource]="feeds" class="mat-elevation-z8">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let f">{{ f.name }}</td>
            </ng-container>

            <!-- URL Column -->
            <ng-container matColumnDef="url">
                <th mat-header-cell *matHeaderCellDef>URL</th>
                <td mat-cell *matCellDef="let f">{{ f.url }}</td>
            </ng-container>

            <!-- Priority Column -->
            <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef>Priority</th>
                <td mat-cell *matCellDef="let f">{{ f.priority }}</td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let f">
                    <button mat-icon-button (click)="edit(f)">
                        <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button (click)="remove(f)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `,
    styles: [`table { width: 100%; margin-top: 1em; }`]
})
export class IndexersComponent implements OnInit {
    form: FormGroup;
    feeds: FeedDto[] = [];
    displayedColumns = ['name', 'url', 'priority', 'actions'];
    editingId: number | null = null;

    constructor(private svc: IndexersService, fb: FormBuilder) {
        this.form = fb.group({ name: [''], url: [''], priority: [0] });
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.svc.list().subscribe(f => (this.feeds = f));
    }

    add() {
        const value = this.form.value;
        if (this.editingId) {
            this.svc.update(this.editingId, value).subscribe(() => this.reset());
        } else {
            this.svc.create(value).subscribe(() => this.reset());
        }
    }

    edit(feed: FeedDto) {
        this.editingId = feed.id;
        this.form.setValue({
            name: feed.name,
            url: feed.url,
            priority: feed.priority
        });
    }

    remove(feed: FeedDto) {
        this.svc.remove(feed.id).subscribe(() => this.load());
    }

    reset() {
        this.editingId = null;
        this.form.reset({ name: '', url: '', priority: 0 });
        this.load();
    }
}
