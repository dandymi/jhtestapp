import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhtestappSharedModule } from 'app/shared';
import {
  SCAgentScAgComponent,
  SCAgentScAgDetailComponent,
  SCAgentScAgUpdateComponent,
  SCAgentScAgDeletePopupComponent,
  SCAgentScAgDeleteDialogComponent,
  sCAgentRoute,
  sCAgentPopupRoute
} from './';

const ENTITY_STATES = [...sCAgentRoute, ...sCAgentPopupRoute];

@NgModule({
  imports: [JhtestappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SCAgentScAgComponent,
    SCAgentScAgDetailComponent,
    SCAgentScAgUpdateComponent,
    SCAgentScAgDeleteDialogComponent,
    SCAgentScAgDeletePopupComponent
  ],
  entryComponents: [SCAgentScAgComponent, SCAgentScAgUpdateComponent, SCAgentScAgDeleteDialogComponent, SCAgentScAgDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestappSCAgentScAgModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
