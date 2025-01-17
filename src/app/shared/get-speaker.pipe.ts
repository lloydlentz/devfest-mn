import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';
import { YearService } from '../year.service';

/**
 * Take a speaker ID and returns a speaker
 *
 * example template expression:
 * {{ (community | getSpeaker | async)?.['name'] }}
 */
@Pipe({ name: 'getSpeaker' })
export class GetSpeakerPipe implements PipeTransform {
    constructor(private ds: DataService, private yearService: YearService) {}

    transform(value: string): any {
        if (value) {
            let speakers = this.ds.getSpeakers(this.yearService.year);
            return speakers.pipe(
                map((list) => {
                    if (list) {
                        return list.find((item) => item.$key === value);
                    } else {
                        return null;
                    }
                })
            );
        }
    }
}
