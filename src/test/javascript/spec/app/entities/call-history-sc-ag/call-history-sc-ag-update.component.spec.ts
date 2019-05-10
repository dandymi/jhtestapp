/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { CallHistoryScAgUpdateComponent } from 'app/entities/call-history-sc-ag/call-history-sc-ag-update.component';
import { CallHistoryScAgService } from 'app/entities/call-history-sc-ag/call-history-sc-ag.service';
import { CallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';

describe('Component Tests', () => {
  describe('CallHistoryScAg Management Update Component', () => {
    let comp: CallHistoryScAgUpdateComponent;
    let fixture: ComponentFixture<CallHistoryScAgUpdateComponent>;
    let service: CallHistoryScAgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [CallHistoryScAgUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CallHistoryScAgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CallHistoryScAgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CallHistoryScAgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CallHistoryScAg(123);
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
        const entity = new CallHistoryScAg();
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
