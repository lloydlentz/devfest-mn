import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';

@Component({
    template: `
    <style>p { margin: 16px;} </style>
    <div style="text-align:center;">
    <p>Thank you for submitting a talk proposal! We'll be reaching out to you with more information as we review the proposals.</p>
    <p>You can make additional changes to your CFP by visiting this page in the future.</p>
    <button mat-raised-button color="primary" style="margin:16px auto;" (click)="closeDialog()">Close</button>
    </div>
    `,
    standalone: true,
    imports: [MatLegacyButtonModule],
})
export class ThanksDialogComponent {
    constructor(public dialogRef: MatDialogRef<ThanksDialogComponent>) { }

    closeDialog() {
      this.dialogRef.close();
    }
}
