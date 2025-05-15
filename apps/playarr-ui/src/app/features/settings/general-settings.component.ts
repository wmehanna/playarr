import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralSettingsDto } from '@playarr/shared-types';

@Component({
    selector: 'pa-general-settings',
    template: `
    <h3>General Settings</h3>
    <form [formGroup]="form" (ngSubmit)="save()">
      <label>
        Download Path:
        <input formControlName="downloadPath" placeholder="/downloads" required />
      </label>
      <label>
        Retention Days:
        <input type="number" formControlName="retentionDays" required />
      </label>
      <label>
        <input type="checkbox" formControlName="deleteInstallerFiles" />
        Delete installer files after extract
      </label>
      <label>
        Max Parallel Extracts:
        <input type="number" formControlName="maxConcurrentExtractions" required />
      </label>
      <label>
        Max Extract Retries:
        <input type="number" formControlName="maxExtractionRetries" required />
      </label>
      <button type="submit" [disabled]="form.invalid">Save</button>
    </form>
  `
})
export class GeneralSettingsComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.form = this.fb.group({
            downloadPath: ['', Validators.required],
            retentionDays: [0, [Validators.required, Validators.min(0)]],
            deleteInstallerFiles: [false],
            maxConcurrentExtractions: [2, [Validators.required, Validators.min(1)]],
            maxExtractionRetries: [3, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit() {
        this.http.get<GeneralSettingsDto>('/api/settings/general')
            .subscribe(cfg => this.form.patchValue(cfg));
    }

    save() {
        this.http.put<GeneralSettingsDto>('/api/settings/general', this.form.value)
            .subscribe();
    }
}
