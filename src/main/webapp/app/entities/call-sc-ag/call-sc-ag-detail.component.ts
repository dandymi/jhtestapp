import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICallScAg } from 'app/shared/model/call-sc-ag.model';

@Component({
  selector: 'jhi-call-sc-ag-detail',
  templateUrl: './call-sc-ag-detail.component.html'
})
export class CallScAgDetailComponent implements OnInit {
  call: ICallScAg;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ call }) => {
      this.call = call;
    });
  }

  previousState() {
    window.history.back();
  }
}
