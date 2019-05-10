import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientScAg } from 'app/shared/model/client-sc-ag.model';
import { ClientScAgService } from './client-sc-ag.service';

@Component({
  selector: 'jhi-client-sc-ag-delete-dialog',
  templateUrl: './client-sc-ag-delete-dialog.component.html'
})
export class ClientScAgDeleteDialogComponent {
  client: IClientScAg;

  constructor(protected clientService: ClientScAgService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.clientService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'clientListModification',
        content: 'Deleted an client'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-client-sc-ag-delete-popup',
  template: ''
})
export class ClientScAgDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ client }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ClientScAgDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.client = client;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/client-sc-ag', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/client-sc-ag', { outlets: { popup: null } }]);
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
