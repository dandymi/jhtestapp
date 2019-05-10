import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IClientScAg, ClientScAg } from 'app/shared/model/client-sc-ag.model';
import { ClientScAgService } from './client-sc-ag.service';
import { ISCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';
import { SCAgentScAgService } from 'app/entities/sc-agent-sc-ag';
import { ICallScAg } from 'app/shared/model/call-sc-ag.model';
import { CallScAgService } from 'app/entities/call-sc-ag';

@Component({
  selector: 'jhi-client-sc-ag-update',
  templateUrl: './client-sc-ag-update.component.html'
})
export class ClientScAgUpdateComponent implements OnInit {
  client: IClientScAg;
  isSaving: boolean;

  scagents: ISCAgentScAg[];

  calls: ICallScAg[];
  dateAddedDp: any;
  dateExpireDp: any;
  dateStateDp: any;

  editForm = this.fb.group({
    id: [],
    denomination: [null, [Validators.required]],
    vatCode: [null, [Validators.required]],
    webSite: [null, [Validators.required]],
    notes: [],
    dateAdded: [],
    dateExpire: [],
    state: [],
    dateState: [],
    notesState: [],
    sCAgentId: [],
    callId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clientService: ClientScAgService,
    protected sCAgentService: SCAgentScAgService,
    protected callService: CallScAgService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
      this.client = client;
    });
    this.sCAgentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISCAgentScAg[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISCAgentScAg[]>) => response.body)
      )
      .subscribe((res: ISCAgentScAg[]) => (this.scagents = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.callService
      .query({ filter: 'client-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICallScAg[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICallScAg[]>) => response.body)
      )
      .subscribe(
        (res: ICallScAg[]) => {
          if (!this.client.callId) {
            this.calls = res;
          } else {
            this.callService
              .find(this.client.callId)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICallScAg>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICallScAg>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICallScAg) => (this.calls = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(client: IClientScAg) {
    this.editForm.patchValue({
      id: client.id,
      denomination: client.denomination,
      vatCode: client.vatCode,
      webSite: client.webSite,
      notes: client.notes,
      dateAdded: client.dateAdded,
      dateExpire: client.dateExpire,
      state: client.state,
      dateState: client.dateState,
      notesState: client.notesState,
      sCAgentId: client.sCAgentId,
      callId: client.callId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClientScAg {
    const entity = {
      ...new ClientScAg(),
      id: this.editForm.get(['id']).value,
      denomination: this.editForm.get(['denomination']).value,
      vatCode: this.editForm.get(['vatCode']).value,
      webSite: this.editForm.get(['webSite']).value,
      notes: this.editForm.get(['notes']).value,
      dateAdded: this.editForm.get(['dateAdded']).value,
      dateExpire: this.editForm.get(['dateExpire']).value,
      state: this.editForm.get(['state']).value,
      dateState: this.editForm.get(['dateState']).value,
      notesState: this.editForm.get(['notesState']).value,
      sCAgentId: this.editForm.get(['sCAgentId']).value,
      callId: this.editForm.get(['callId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientScAg>>) {
    result.subscribe((res: HttpResponse<IClientScAg>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackSCAgentById(index: number, item: ISCAgentScAg) {
    return item.id;
  }

  trackCallById(index: number, item: ICallScAg) {
    return item.id;
  }
}
