import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICallScAg } from 'app/shared/model/call-sc-ag.model';
import { AccountService } from 'app/core';
import { CallScAgService } from './call-sc-ag.service';

@Component({
  selector: 'jhi-call-sc-ag',
  templateUrl: './call-sc-ag.component.html'
})
export class CallScAgComponent implements OnInit, OnDestroy {
  calls: ICallScAg[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected callService: CallScAgService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.callService
      .query()
      .pipe(
        filter((res: HttpResponse<ICallScAg[]>) => res.ok),
        map((res: HttpResponse<ICallScAg[]>) => res.body)
      )
      .subscribe(
        (res: ICallScAg[]) => {
          this.calls = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCalls();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICallScAg) {
    return item.id;
  }

  registerChangeInCalls() {
    this.eventSubscriber = this.eventManager.subscribe('callListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
