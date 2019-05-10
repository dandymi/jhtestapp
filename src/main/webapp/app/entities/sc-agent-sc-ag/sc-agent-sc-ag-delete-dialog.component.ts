import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';
import { SCAgentScAgService } from './sc-agent-sc-ag.service';

@Component({
  selector: 'jhi-sc-agent-sc-ag-delete-dialog',
  templateUrl: './sc-agent-sc-ag-delete-dialog.component.html'
})
export class SCAgentScAgDeleteDialogComponent {
  sCAgent: ISCAgentScAg;

  constructor(protected sCAgentService: SCAgentScAgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sCAgentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sCAgentListModification',
        content: 'Deleted an sCAgent'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sc-agent-sc-ag-delete-popup',
  template: ''
})
export class SCAgentScAgDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sCAgent }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SCAgentScAgDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sCAgent = sCAgent;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sc-agent-sc-ag', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sc-agent-sc-ag', { outlets: { popup: null } }]);
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
