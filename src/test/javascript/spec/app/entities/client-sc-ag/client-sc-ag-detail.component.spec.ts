/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { ClientScAgDetailComponent } from 'app/entities/client-sc-ag/client-sc-ag-detail.component';
import { ClientScAg } from 'app/shared/model/client-sc-ag.model';

describe('Component Tests', () => {
  describe('ClientScAg Management Detail Component', () => {
    let comp: ClientScAgDetailComponent;
    let fixture: ComponentFixture<ClientScAgDetailComponent>;
    const route = ({ data: of({ client: new ClientScAg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [ClientScAgDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ClientScAgDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientScAgDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.client).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
