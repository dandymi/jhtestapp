import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICallHistoryScAg, CallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';
import { CallHistoryScAgService } from './call-history-sc-ag.service';
import { ICallScAg } from 'app/shared/model/call-sc-ag.model';
import { CallScAgService } from 'app/entities/call-sc-ag';

@Component({
  selector: 'jhi-call-history-sc-ag-update',
  templateUrl: './call-history-sc-ag-update.component.html'
})
export class CallHistoryScAgUpdateComponent implements OnInit {
  callHistory: ICallHistoryScAg;
  isSaving: boolean;

  calls: ICallScAg[];

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [],
    action: [],
    callId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected callHistoryService: CallHistoryScAgService,
    protected callService: CallScAgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ callHistory }) => {
      this.updateForm(callHistory);
      this.callHistory = callHistory;
    });
    this.callService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICallScAg[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICallScAg[]>) => response.body)
      )
      .subscribe((res: ICallScAg[]) => (this.calls = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(callHistory: ICallHistoryScAg) {
    this.editForm.patchValue({
      id: callHistory.id,
      startDate: callHistory.startDate != null ? callHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: callHistory.endDate != null ? callHistory.endDate.format(DATE_TIME_FORMAT) : null,
      action: callHistory.action,
      callId: callHistory.callId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const callHistory = this.createFromForm();
    if (callHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.callHistoryService.update(callHistory));
    } else {
      this.subscribeToSaveResponse(this.callHistoryService.create(callHistory));
    }
  }

  private createFromForm(): ICallHistoryScAg {
    const entity = {
      ...new CallHistoryScAg(),
      id: this.editForm.get(['id']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      action: this.editForm.get(['action']).value,
      callId: this.editForm.get(['callId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICallHistoryScAg>>) {
    result.subscribe((res: HttpResponse<ICallHistoryScAg>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCallById(index: number, item: ICallScAg) {
    return item.id;
  }
}
