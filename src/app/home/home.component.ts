import { Component } from '@angular/core';

import { environment } from '../../environments/environment';
import { YearService } from '../year.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: './home.component.html',
    standalone: true,
    imports: [RouterLink, NgIf],
})
export class HomeComponent {
    environment = environment;
    faqSelection = 1;

    setFaqSelection(question) {
        this.faqSelection = question;
    }

    constructor(yearService: YearService) {
        yearService.reset();
    }
}
