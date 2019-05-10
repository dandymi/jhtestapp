/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { CallScAgDetailComponent } from 'app/entities/call-sc-ag/call-sc-ag-detail.component';
import { CallScAg } from 'app/shared/model/call-sc-ag.model';

describe('Component Tests', () => {
  describe('CallScAg Management Detail Component', () => {
    let comp: CallScAgDetailComponent;
    let fixture: ComponentFixture<CallScAgDetailComponent>;
    const route = ({ data: of({ call: new CallScAg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [CallScAgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CallScAgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CallScAgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.call).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
