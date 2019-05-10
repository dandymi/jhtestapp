import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICallScAg } from 'app/shared/model/call-sc-ag.model';

type EntityResponseType = HttpResponse<ICallScAg>;
type EntityArrayResponseType = HttpResponse<ICallScAg[]>;

@Injectable({ providedIn: 'root' })
export class CallScAgService {
  public resourceUrl = SERVER_API_URL + 'api/calls';

  constructor(protected http: HttpClient) {}

  create(call: ICallScAg): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(call);
    return this.http
      .post<ICallScAg>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(call: ICallScAg): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(call);
    return this.http
      .put<ICallScAg>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICallScAg>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICallScAg[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(call: ICallScAg): ICallScAg {
    const copy: ICallScAg = Object.assign({}, call, {
      dateCall: call.dateCall != null && call.dateCall.isValid() ? call.dateCall.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCall = res.body.dateCall != null ? moment(res.body.dateCall) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((call: ICallScAg) => {
        call.dateCall = call.dateCall != null ? moment(call.dateCall) : null;
      });
    }
    return res;
  }
}
