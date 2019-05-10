import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhtestappSharedModule } from 'app/shared';
import {
  CallHistoryScAgComponent,
  CallHistoryScAgDetailComponent,
  CallHistoryScAgUpdateComponent,
  CallHistoryScAgDeletePopupComponent,
  CallHistoryScAgDeleteDialogComponent,
  callHistoryRoute,
  callHistoryPopupRoute
} from './';

const ENTITY_STATES = [...callHistoryRoute, ...callHistoryPopupRoute];

@NgModule({
  imports: [JhtestappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CallHistoryScAgComponent,
    CallHistoryScAgDetailComponent,
    CallHistoryScAgUpdateComponent,
    CallHistoryScAgDeleteDialogComponent,
    CallHistoryScAgDeletePopupComponent
  ],
  entryComponents: [
    CallHistoryScAgComponent,
    CallHistoryScAgUpdateComponent,
    CallHistoryScAgDeleteDialogComponent,
    CallHistoryScAgDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestappCallHistoryScAgModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
