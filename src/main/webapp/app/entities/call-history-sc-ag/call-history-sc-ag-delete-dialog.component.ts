import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';
import { CallHistoryScAgService } from './call-history-sc-ag.service';

@Component({
  selector: 'jhi-call-history-sc-ag-delete-dialog',
  templateUrl: './call-history-sc-ag-delete-dialog.component.html'
})
export class CallHistoryScAgDeleteDialogComponent {
  callHistory: ICallHistoryScAg;

  constructor(
    protected callHistoryService: CallHistoryScAgService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.callHistoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'callHistoryListModification',
        content: 'Deleted an callHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-call-history-sc-ag-delete-popup',
  template: ''
})
export class CallHistoryScAgDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ callHistory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CallHistoryScAgDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.callHistory = callHistory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/call-history-sc-ag', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/call-history-sc-ag', { outlets: { popup: null } }]);
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
