import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientScAg } from 'app/shared/model/client-sc-ag.model';

@Component({
  selector: 'jhi-client-sc-ag-detail',
  templateUrl: './client-sc-ag-detail.component.html'
})
export class ClientScAgDetailComponent implements OnInit {
  client: IClientScAg;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.client = client;
    });
  }

  previousState() {
    window.history.back();
  }
}
