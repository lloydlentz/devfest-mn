import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanksDialogComponent } from './thanks.dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { YearService } from '../year.service';
import { tap, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from '../realtime-data/auth.service';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-cfp',
    templateUrl: './cfp.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        MatLegacyFormFieldModule,
        MatLegacyInputModule,
        MatLegacyRadioModule,
        MatLegacyButtonModule,
        AsyncPipe,
        DatePipe,
    ],
})
export class CFPComponent {
    cfp = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        twitter: [''],
        phone: ['', Validators.pattern('^[0-9-+_ ]{7,}$')],
        company: [''],
        technology: [''],
        type: ['', Validators.required],
        difficulty: ['', Validators.required],
        title: ['', Validators.required],
        abstract: ['', Validators.required],
        bio: ['', Validators.required],
        references: [''],
        referrer: ['', Validators.required],
    });

    priorSubmissionDate: string = null;

    constructor(
        private store: AngularFirestore,
        private fb: FormBuilder,
        private dialog: MatDialog,
        public auth: AuthService,
        private yearService: YearService
    ) {
        auth.uid
            .pipe(
                tap(x => console.log('Id was', x)),
                switchMap(uid => this.store.doc(`years/${this.yearService.year}/proposals/${uid}`).valueChanges()),
                take(1),
                filter(x => !!x)
            )
            .subscribe(priorSubmission => {
                this.cfp.patchValue(priorSubmission);
                this.priorSubmissionDate = priorSubmission['date'];
            });
    }

    submit(group, uid: string) {
        if (group.valid) {
            const proposal = this.store.doc(`years/${this.yearService.year}/proposals/${uid}`);
            proposal.set({...group.value, date: new Date().toISOString()});
            this.dialog.open(ThanksDialogComponent);
        }
    }
}
