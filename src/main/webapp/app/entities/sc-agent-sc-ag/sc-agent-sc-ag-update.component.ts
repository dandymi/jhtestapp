import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ISCAgentScAg, SCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';
import { SCAgentScAgService } from './sc-agent-sc-ag.service';

@Component({
  selector: 'jhi-sc-agent-sc-ag-update',
  templateUrl: './sc-agent-sc-ag-update.component.html'
})
export class SCAgentScAgUpdateComponent implements OnInit {
  sCAgent: ISCAgentScAg;
  isSaving: boolean;
  expireDateSContractDp: any;

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    mobilePhone: [],
    email: [null, [Validators.required]],
    scCodeCitizen: [],
    iban: [],
    expireDateSContract: []
  });

  constructor(protected sCAgentService: SCAgentScAgService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sCAgent }) => {
      this.updateForm(sCAgent);
      this.sCAgent = sCAgent;
    });
  }

  updateForm(sCAgent: ISCAgentScAg) {
    this.editForm.patchValue({
      id: sCAgent.id,
      firstName: sCAgent.firstName,
      lastName: sCAgent.lastName,
      mobilePhone: sCAgent.mobilePhone,
      email: sCAgent.email,
      scCodeCitizen: sCAgent.scCodeCitizen,
      iban: sCAgent.iban,
      expireDateSContract: sCAgent.expireDateSContract
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sCAgent = this.createFromForm();
    if (sCAgent.id !== undefined) {
      this.subscribeToSaveResponse(this.sCAgentService.update(sCAgent));
    } else {
      this.subscribeToSaveResponse(this.sCAgentService.create(sCAgent));
    }
  }

  private createFromForm(): ISCAgentScAg {
    const entity = {
      ...new SCAgentScAg(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      mobilePhone: this.editForm.get(['mobilePhone']).value,
      email: this.editForm.get(['email']).value,
      scCodeCitizen: this.editForm.get(['scCodeCitizen']).value,
      iban: this.editForm.get(['iban']).value,
      expireDateSContract: this.editForm.get(['expireDateSContract']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISCAgentScAg>>) {
    result.subscribe((res: HttpResponse<ISCAgentScAg>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
