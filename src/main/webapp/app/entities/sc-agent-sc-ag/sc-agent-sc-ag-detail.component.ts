import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';

@Component({
  selector: 'jhi-sc-agent-sc-ag-detail',
  templateUrl: './sc-agent-sc-ag-detail.component.html'
})
export class SCAgentScAgDetailComponent implements OnInit {
  sCAgent: ISCAgentScAg;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sCAgent }) => {
      this.sCAgent = sCAgent;
    });
  }

  previousState() {
    window.history.back();
  }
}
