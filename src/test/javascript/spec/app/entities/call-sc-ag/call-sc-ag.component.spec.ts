/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhtestappTestModule } from '../../../test.module';
import { CallScAgComponent } from 'app/entities/call-sc-ag/call-sc-ag.component';
import { CallScAgService } from 'app/entities/call-sc-ag/call-sc-ag.service';
import { CallScAg } from 'app/shared/model/call-sc-ag.model';

describe('Component Tests', () => {
  describe('CallScAg Management Component', () => {
    let comp: CallScAgComponent;
    let fixture: ComponentFixture<CallScAgComponent>;
    let service: CallScAgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [CallScAgComponent],
        providers: []
      })
        .overrideTemplate(CallScAgComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CallScAgComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CallScAgService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CallScAg(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.calls[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
