import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhtestappSharedModule } from 'app/shared';
import {
  CallScAgComponent,
  CallScAgDetailComponent,
  CallScAgUpdateComponent,
  CallScAgDeletePopupComponent,
  CallScAgDeleteDialogComponent,
  callRoute,
  callPopupRoute
} from './';

const ENTITY_STATES = [...callRoute, ...callPopupRoute];

@NgModule({
  imports: [JhtestappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CallScAgComponent,
    CallScAgDetailComponent,
    CallScAgUpdateComponent,
    CallScAgDeleteDialogComponent,
    CallScAgDeletePopupComponent
  ],
  entryComponents: [CallScAgComponent, CallScAgUpdateComponent, CallScAgDeleteDialogComponent, CallScAgDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestappCallScAgModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
