import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';

type EntityResponseType = HttpResponse<ICallHistoryScAg>;
type EntityArrayResponseType = HttpResponse<ICallHistoryScAg[]>;

@Injectable({ providedIn: 'root' })
export class CallHistoryScAgService {
  public resourceUrl = SERVER_API_URL + 'api/call-histories';

  constructor(protected http: HttpClient) {}

  create(callHistory: ICallHistoryScAg): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(callHistory);
    return this.http
      .post<ICallHistoryScAg>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(callHistory: ICallHistoryScAg): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(callHistory);
    return this.http
      .put<ICallHistoryScAg>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICallHistoryScAg>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICallHistoryScAg[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(callHistory: ICallHistoryScAg): ICallHistoryScAg {
    const copy: ICallHistoryScAg = Object.assign({}, callHistory, {
      startDate: callHistory.startDate != null && callHistory.startDate.isValid() ? callHistory.startDate.toJSON() : null,
      endDate: callHistory.endDate != null && callHistory.endDate.isValid() ? callHistory.endDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((callHistory: ICallHistoryScAg) => {
        callHistory.startDate = callHistory.startDate != null ? moment(callHistory.startDate) : null;
        callHistory.endDate = callHistory.endDate != null ? moment(callHistory.endDate) : null;
      });
    }
    return res;
  }
}
