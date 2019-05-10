import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhtestappSharedModule } from 'app/shared';
import {
  ClientScAgComponent,
  ClientScAgDetailComponent,
  ClientScAgUpdateComponent,
  ClientScAgDeletePopupComponent,
  ClientScAgDeleteDialogComponent,
  clientRoute,
  clientPopupRoute
} from './';

const ENTITY_STATES = [...clientRoute, ...clientPopupRoute];

@NgModule({
  imports: [JhtestappSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ClientScAgComponent,
    ClientScAgDetailComponent,
    ClientScAgUpdateComponent,
    ClientScAgDeleteDialogComponent,
    ClientScAgDeletePopupComponent
  ],
  entryComponents: [ClientScAgComponent, ClientScAgUpdateComponent, ClientScAgDeleteDialogComponent, ClientScAgDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestappClientScAgModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
