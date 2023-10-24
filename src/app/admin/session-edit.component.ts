
import {of as observableOf,  Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { DataService, Session } from '../shared/data.service';
import { YearService } from '../year.service';
import { FireJoinPipe } from '../realtime-data/fire-join.pipe';
import { SpeakerSelectorComponent } from './speaker-selector.component';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule } from '@angular/material/legacy-core';
import { MatLegacyAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { NgIf, NgFor, AsyncPipe, KeyValuePipe } from '@angular/common';

@Component({
    templateUrl: './session-edit.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatLegacyFormFieldModule,
        MatLegacyInputModule,
        FormsModule,
        MatLegacyAutocompleteModule,
        NgFor,
        MatLegacyOptionModule,
        MatLegacyButtonModule,
        SpeakerSelectorComponent,
        AsyncPipe,
        KeyValuePipe,
        FireJoinPipe,
    ],
})
export class SessionEditComponent {
    sessionData: Observable<Session>;

    constructor(
        public ds: DataService,
        public route: ActivatedRoute,
        public router: Router,
        public yearService: YearService
    ) {
        this.sessionData = route.params.pipe(switchMap(params => {
            if (params['id'] === 'new') {
                return observableOf({ startTime: params['time'], room: params['room'] });
            }
            return ds.getSchedule(yearService.year).pipe(map(list => list.find(item => item.$key === params['id'])));
        }));
    }

    save(session) {
        event.preventDefault();
        this.ds.save('schedule', session);
        this.router.navigate(['/', this.yearService.year, 'schedule']);
    }

    delete(session) {
        this.ds.delete('schedule', session);
        this.router.navigate(['/', this.yearService.year, 'schedule']);
    }

    deleteSpeakerFromSession(session: Session, speakerKey: string) {
       this.ds.deleteSpeakerFromSession(session, speakerKey);
    }
    getValues(obj) {
        return Object.keys(obj).map(key => obj[key]);
    }
}
