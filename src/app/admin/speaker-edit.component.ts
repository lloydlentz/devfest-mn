import { of as observableOf, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, map } from 'rxjs/operators';
import { DataService, Speaker } from '../shared/data.service';
import { YearService } from '../year.service';
import { UploaderComponent } from './sffb/uploader.component';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule } from '@angular/material/legacy-checkbox';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    templateUrl: './speaker-edit.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatLegacyFormFieldModule,
        MatLegacyInputModule,
        FormsModule,
        MatLegacyCheckboxModule,
        MatLegacyButtonModule,
        UploaderComponent,
        AsyncPipe,
    ],
})
export class SpeakerEditComponent {
    speakerData: Observable<Speaker>;

    constructor(
        public ds: DataService,
        public route: ActivatedRoute,
        public router: Router,
        public yearService: YearService
    ) {
        this.speakerData = route.params.pipe(
            switchMap(params => {
                if (params['id'] === 'new') {
                    return observableOf({});
                }
                return ds.getSpeakers(this.yearService.year).pipe(map(list => list.find(item => item.$key === params['id'])));
            })
        );
    }

    save(speaker) {
        console.log('Saving speaker', speaker);
        event.preventDefault();
        this.ds.save('speakers', speaker);
        console.log('rerouting to', this.yearService.year);
        this.router.navigate(['/', this.yearService.year, 'speakers']);
    }

    delete(speaker) {
        if (confirm('Are you sure you want to delete this speaker?')) {
            this.ds.delete('speakers', speaker);
            this.router.navigate(['/', this.yearService.year, 'speakers']);
        }
    }
}
