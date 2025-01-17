import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderComponent } from './uploader.component';

export interface FirebaseStorageConfig {
    abc: boolean;
}
export const FIREBASE_STORAGE_CONFIG = new InjectionToken<FirebaseStorageConfig>(
    'FIREBASE_STORAGE_CONFIG'
);

@NgModule({
    exports: [UploaderComponent],
    declarations: [UploaderComponent],
    imports: [CommonModule],
})
export class SFFBModule {
    private static configure(config: FirebaseStorageConfig): ModuleWithProviders<SFFBModule> {
        return {
            ngModule: SFFBModule,
            providers: [{ provide: FIREBASE_STORAGE_CONFIG, useValue: config }],
        };
    }
}
