import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NamingService } from './naming.service';
import { NamingConventionDto } from '@playarr/shared-types';

@Component({
    selector: 'pa-naming-conventions',
    template: `
    <h3>Naming Conventions</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <input matInput placeholder="Name" formControlName="name" required />
      <input matInput placeholder="Pattern (e.g. [GameTitle] - [Year])"
             formControlName="pattern" required />
      <button mat-raised-button color="primary" type="submit"
              [disabled]="form.invalid">
        {{ editing ? 'Update' : 'Add' }}
      </button>
      <button *ngIf="editing" mat-button type="button" (click)="cancel()">Cancel</button>
    </form>
    <mat-list>
      <mat-list-item *ngFor="let c of conventions">
        <span>{{ c.name }}: {{ c.pattern }}</span>
        <button mat-icon-button (click)="edit(c)"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button (click)="remove(c)"><mat-icon>delete</mat-icon></button>
      </mat-list-item>
    </mat-list>
  `,
    styles: [`.u-full-width { width: 100%; }`]
})
export class NamingConventionsComponent implements OnInit {
    form: FormGroup;
    conventions: NamingConventionDto[] = [];
    editing = false;

    constructor(
        private fb: FormBuilder,
        private namingService: NamingService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            pattern: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.namingService.list().subscribe(c => this.conventions = c);
    }

    save() {
        const dto = this.form.value as NamingConventionDto;
        this.namingService.save(dto).subscribe(() => this.reset());
    }

    edit(c: NamingConventionDto) {
        this.editing = true;
        this.form.setValue({ name: c.name, pattern: c.pattern });
    }

    remove(c: NamingConventionDto) {
        this.namingService.remove(c.id).subscribe(() => this.load());
    }

    cancel() {
        this.reset();
    }

    private reset() {
        this.editing = false;
        this.form.reset({ name: '', pattern: '' });
        this.load();
    }
}
