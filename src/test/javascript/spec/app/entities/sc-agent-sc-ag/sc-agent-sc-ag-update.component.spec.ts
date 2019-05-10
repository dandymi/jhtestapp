/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhtestappTestModule } from '../../../test.module';
import { SCAgentScAgUpdateComponent } from 'app/entities/sc-agent-sc-ag/sc-agent-sc-ag-update.component';
import { SCAgentScAgService } from 'app/entities/sc-agent-sc-ag/sc-agent-sc-ag.service';
import { SCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';

describe('Component Tests', () => {
  describe('SCAgentScAg Management Update Component', () => {
    let comp: SCAgentScAgUpdateComponent;
    let fixture: ComponentFixture<SCAgentScAgUpdateComponent>;
    let service: SCAgentScAgService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [SCAgentScAgUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SCAgentScAgUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SCAgentScAgUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SCAgentScAgService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SCAgentScAg(123);
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
        const entity = new SCAgentScAg();
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
