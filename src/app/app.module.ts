import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, UrlSegment } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ADirective } from './a.directive';



export function isMarketingContent(url: UrlSegment[]) {
    let result =
        url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp|conduct)/)
            ? { consumed: [] }
            : null;
    return result;
}
