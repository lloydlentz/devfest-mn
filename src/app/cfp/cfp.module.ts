import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CFPComponent } from './cfp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { ThanksDialogComponent } from './thanks.dialog.component';
import { RealtimeDataModule } from '../realtime-data/realtime-data.module';

@NgModule({
    imports: [
        CommonModule,
        RealtimeDataModule,
        RouterModule.forChild([{ path: '', component: CFPComponent }]),
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        CFPComponent, ThanksDialogComponent,
    ]
})
export class CFPModule {}
