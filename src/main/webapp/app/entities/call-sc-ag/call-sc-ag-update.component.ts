import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ICallScAg, CallScAg } from 'app/shared/model/call-sc-ag.model';
import { CallScAgService } from './call-sc-ag.service';

@Component({
  selector: 'jhi-call-sc-ag-update',
  templateUrl: './call-sc-ag-update.component.html'
})
export class CallScAgUpdateComponent implements OnInit {
  call: ICallScAg;
  isSaving: boolean;
  dateCallDp: any;

  editForm = this.fb.group({
    id: [],
    dateCall: [],
    stateCall: []
  });

  constructor(protected callService: CallScAgService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ call }) => {
      this.updateForm(call);
      this.call = call;
    });
  }

  updateForm(call: ICallScAg) {
    this.editForm.patchValue({
      id: call.id,
      dateCall: call.dateCall,
      stateCall: call.stateCall
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const call = this.createFromForm();
    if (call.id !== undefined) {
      this.subscribeToSaveResponse(this.callService.update(call));
    } else {
      this.subscribeToSaveResponse(this.callService.create(call));
    }
  }

  private createFromForm(): ICallScAg {
    const entity = {
      ...new CallScAg(),
      id: this.editForm.get(['id']).value,
      dateCall: this.editForm.get(['dateCall']).value,
      stateCall: this.editForm.get(['stateCall']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICallScAg>>) {
    result.subscribe((res: HttpResponse<ICallScAg>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
