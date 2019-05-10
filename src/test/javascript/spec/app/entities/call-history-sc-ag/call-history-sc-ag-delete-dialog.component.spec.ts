/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhtestappTestModule } from '../../../test.module';
import { CallHistoryScAgDeleteDialogComponent } from 'app/entities/call-history-sc-ag/call-history-sc-ag-delete-dialog.component';
import { CallHistoryScAgService } from 'app/entities/call-history-sc-ag/call-history-sc-ag.service';

describe('Component Tests', () => {
  describe('CallHistoryScAg Management Delete Component', () => {
    let comp: CallHistoryScAgDeleteDialogComponent;
    let fixture: ComponentFixture<CallHistoryScAgDeleteDialogComponent>;
    let service: CallHistoryScAgService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [CallHistoryScAgDeleteDialogComponent]
      })
        .overrideTemplate(CallHistoryScAgDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CallHistoryScAgDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CallHistoryScAgService);
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
