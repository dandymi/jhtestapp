import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JhtestappSharedLibsModule, JhtestappSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [JhtestappSharedLibsModule, JhtestappSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JhtestappSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestappSharedModule {
  static forRoot() {
    return {
      ngModule: JhtestappSharedModule
    };
  }
}
