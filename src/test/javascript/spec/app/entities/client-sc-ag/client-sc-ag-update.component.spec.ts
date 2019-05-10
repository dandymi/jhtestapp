/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { ClientScAgUpdateComponent } from 'app/entities/client-sc-ag/client-sc-ag-update.component';
import { ClientScAgService } from 'app/entities/client-sc-ag/client-sc-ag.service';
import { ClientScAg } from 'app/shared/model/client-sc-ag.model';

describe('Component Tests', () => {
  describe('ClientScAg Management Update Component', () => {
    let comp: ClientScAgUpdateComponent;
    let fixture: ComponentFixture<ClientScAgUpdateComponent>;
    let service: ClientScAgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [ClientScAgUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ClientScAgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientScAgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientScAgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientScAg(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientScAg();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
