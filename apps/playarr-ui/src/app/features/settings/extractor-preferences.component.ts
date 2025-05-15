import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExtractorPreferenceDto } from '@playarr/shared-types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'pa-extractor-preferences',
    template: `
    <h3>Extractor Preferences</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <div formArrayName="preferences">
        <div
          *ngFor="
            let pref of preferences.controls;
            let i = index
          "
          [formGroupName]="i"
          class="extractor__item"
        >
          <span>{{ pref.value.extractorName }}</span>
          <mat-checkbox formControlName="enabled">Enabled</mat-checkbox>
          <input
            type="number"
            formControlName="priority"
            placeholder="Priority"
          />
        </div>
      </div>
      <button mat-raised-button color="primary" type="submit">
        Save
      </button>
    </form>
  `,
    styles: [
        `
      .extractor__item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }
    `
    ]
})
export class ExtractorPreferencesComponent implements OnInit {
    form: FormGroup;

    get preferences(): FormArray {
        return this.form.get('preferences') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            preferences: this.fb.array([])
        });
    }

    ngOnInit() {
        this.http
            .get<ExtractorPreferenceDto[]>('/api/settings/extractors')
            .subscribe(prefs => {
                const arr = prefs.map(p =>
                    this.fb.group({
                        extractorName: [p.extractorName],
                        enabled: [p.enabled],
                        priority: [p.priority]
                    })
                );
                this.form.setControl('preferences', this.fb.array(arr));
            });
    }

    save() {
        const dto = this.form.value.preferences as ExtractorPreferenceDto[];
        this.http.put('/api/settings/extractors', dto).subscribe(() => {
            this.snackBar.open('Extractor preferences saved', 'Close', {
                duration: 3000
            });
        });
    }
}
