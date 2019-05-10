/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { CallScAgUpdateComponent } from 'app/entities/call-sc-ag/call-sc-ag-update.component';
import { CallScAgService } from 'app/entities/call-sc-ag/call-sc-ag.service';
import { CallScAg } from 'app/shared/model/call-sc-ag.model';

describe('Component Tests', () => {
  describe('CallScAg Management Update Component', () => {
    let comp: CallScAgUpdateComponent;
    let fixture: ComponentFixture<CallScAgUpdateComponent>;
    let service: CallScAgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [CallScAgUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CallScAgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CallScAgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CallScAgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CallScAg(123);
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
        const entity = new CallScAg();
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
