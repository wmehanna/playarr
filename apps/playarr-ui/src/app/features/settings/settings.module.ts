import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { GeneralSettingsComponent } from './general-settings.component';
import { ExtractorPreferencesComponent } from './extractor-preferences.component';
import { NamingConventionsComponent } from './naming-conventions.component';
import { MetadataSettingsComponent } from './metadata-settings.component';
import { ArchiveSettingsComponent } from './archive-settings.component';
import { EmailSettingsComponent } from './email-settings.component';

@NgModule({
    declarations: [
        SettingsComponent,
        GeneralSettingsComponent,
        ExtractorPreferencesComponent,
        NamingConventionsComponent,
        MetadataSettingsComponent,
        ArchiveSettingsComponent,
        EmailSettingsComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SettingsComponent,
                children: [
                    { path: 'general', component: GeneralSettingsComponent },
                    { path: 'extractors', component: ExtractorPreferencesComponent },
                    { path: 'naming', component: NamingConventionsComponent },
                    { path: 'metadata', component: MetadataSettingsComponent },
                    { path: 'archive', component: ArchiveSettingsComponent },
                    { path: 'email', component: EmailSettingsComponent },
                    { path: '', redirectTo: 'general', pathMatch: 'full' }
                ]
            }
        ])
    ]
})
export class SettingsModule {}
