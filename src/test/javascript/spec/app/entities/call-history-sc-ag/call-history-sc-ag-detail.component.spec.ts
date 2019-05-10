/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { CallHistoryScAgDetailComponent } from 'app/entities/call-history-sc-ag/call-history-sc-ag-detail.component';
import { CallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';

describe('Component Tests', () => {
  describe('CallHistoryScAg Management Detail Component', () => {
    let comp: CallHistoryScAgDetailComponent;
    let fixture: ComponentFixture<CallHistoryScAgDetailComponent>;
    const route = ({ data: of({ callHistory: new CallHistoryScAg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [CallHistoryScAgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CallHistoryScAgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CallHistoryScAgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.callHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
