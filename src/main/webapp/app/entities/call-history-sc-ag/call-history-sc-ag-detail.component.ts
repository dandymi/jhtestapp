import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';

@Component({
  selector: 'jhi-call-history-sc-ag-detail',
  templateUrl: './call-history-sc-ag-detail.component.html'
})
export class CallHistoryScAgDetailComponent implements OnInit {
  callHistory: ICallHistoryScAg;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ callHistory }) => {
      this.callHistory = callHistory;
    });
  }

  previousState() {
    window.history.back();
  }
}
