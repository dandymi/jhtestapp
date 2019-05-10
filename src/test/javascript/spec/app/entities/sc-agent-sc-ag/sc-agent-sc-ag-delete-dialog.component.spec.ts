/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhtestappTestModule } from '../../../test.module';
import { SCAgentScAgDeleteDialogComponent } from 'app/entities/sc-agent-sc-ag/sc-agent-sc-ag-delete-dialog.component';
import { SCAgentScAgService } from 'app/entities/sc-agent-sc-ag/sc-agent-sc-ag.service';

describe('Component Tests', () => {
  describe('SCAgentScAg Management Delete Component', () => {
    let comp: SCAgentScAgDeleteDialogComponent;
    let fixture: ComponentFixture<SCAgentScAgDeleteDialogComponent>;
    let service: SCAgentScAgService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [SCAgentScAgDeleteDialogComponent]
      })
        .overrideTemplate(SCAgentScAgDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SCAgentScAgDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SCAgentScAgService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
