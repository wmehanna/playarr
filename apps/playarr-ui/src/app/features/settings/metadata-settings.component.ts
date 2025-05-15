import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralSettingsDto } from '@playarr/shared-types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-metadata-settings',
    template: `
    <h3>Metadata Image Path</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-form-field appearance="outline" class="u-full-width">
        <mat-label>Image Download Path</mat-label>
        <input matInput formControlName="imagePath" required />
        <mat-error *ngIf="form.get('imagePath').hasError('required')">
          Path is required
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" class="u-full-width" [disabled]="form.invalid">
        Save
      </button>
    </form>
  `,
    styles: [`.u-full-width { width: 100%; }`]
})
export class MetadataSettingsComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            imagePath: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.http.get<GeneralSettingsDto>('/api/settings/general')
            .subscribe(cfg => this.form.patchValue({ imagePath: cfg.imagePath }));
    }

    save() {
        const value = { imagePath: this.form.value.imagePath };
        this.http.put<GeneralSettingsDto>('/api/settings/general', value)
            .subscribe(() =>
                this.snackBar.open('Metadata path saved', 'Close', { duration: 3000 })
            );
    }
}
