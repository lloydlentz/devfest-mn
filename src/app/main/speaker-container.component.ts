 import { Component, Input } from '@angular/core';

 @Component({
     selector: 'speaker-container',
     template: `
     <div *ngIf="speaker">
      <div class="speaker-card" *ngIf="speaker.confirmed || showEdit">
        <div *ngIf="speaker.imageUrl">
            <div class="thumb" [style.background-image]="'url('+speaker.imageUrl+')'"></div>
        </div>
        <div class="speaker-content">
            <div *ngIf="!speaker.confirmed && showEdit" style="background-color: yellow"><strong>NOT CONFIRMED</strong></div>
            <div style="font-size:20px;"><a [routerLink]="['/',year,'speakers',speaker.$key,speaker.name]">{{speaker.name}}</a>
            <a *ngIf="showEdit" [routerLink]="['/',year,'admin','speakers',speaker.$key,'edit']"><img src="/a/edit.svg"></a>
            </div>
            <div>{{speaker.company}}</div>
            <div *ngIf="speaker.twitter"><a href="https://twitter.com/{{speaker.twitter}}" target="_blank">&#64;{{speaker.twitter}}</a></div>
        </div>
    </div>
    </div>

     `
 })
 export class SpeakerContainerComponent {
     @Input() speaker;
     @Input() year;
     @Input() showEdit = false;

 }
