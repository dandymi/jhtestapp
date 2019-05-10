/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { SCAgentScAgDetailComponent } from 'app/entities/sc-agent-sc-ag/sc-agent-sc-ag-detail.component';
import { SCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';

describe('Component Tests', () => {
  describe('SCAgentScAg Management Detail Component', () => {
    let comp: SCAgentScAgDetailComponent;
    let fixture: ComponentFixture<SCAgentScAgDetailComponent>;
    const route = ({ data: of({ sCAgent: new SCAgentScAg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [SCAgentScAgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SCAgentScAgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SCAgentScAgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sCAgent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
