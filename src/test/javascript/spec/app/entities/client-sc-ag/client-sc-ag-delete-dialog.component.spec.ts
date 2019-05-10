/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhtestappTestModule } from '../../../test.module';
import { ClientScAgDeleteDialogComponent } from 'app/entities/client-sc-ag/client-sc-ag-delete-dialog.component';
import { ClientScAgService } from 'app/entities/client-sc-ag/client-sc-ag.service';

describe('Component Tests', () => {
  describe('ClientScAg Management Delete Component', () => {
    let comp: ClientScAgDeleteDialogComponent;
    let fixture: ComponentFixture<ClientScAgDeleteDialogComponent>;
    let service: ClientScAgService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhtestappTestModule],
        declarations: [ClientScAgDeleteDialogComponent]
      })
        .overrideTemplate(ClientScAgDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientScAgDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientScAgService);
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
