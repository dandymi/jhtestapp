import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICallScAg } from 'app/shared/model/call-sc-ag.model';
import { CallScAgService } from './call-sc-ag.service';

@Component({
  selector: 'jhi-call-sc-ag-delete-dialog',
  templateUrl: './call-sc-ag-delete-dialog.component.html'
})
export class CallScAgDeleteDialogComponent {
  call: ICallScAg;

  constructor(protected callService: CallScAgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.callService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'callListModification',
        content: 'Deleted an call'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-call-sc-ag-delete-popup',
  template: ''
})
export class CallScAgDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ call }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CallScAgDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.call = call;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/call-sc-ag', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/call-sc-ag', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
