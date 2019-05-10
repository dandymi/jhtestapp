import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClientScAg } from 'app/shared/model/client-sc-ag.model';

type EntityResponseType = HttpResponse<IClientScAg>;
type EntityArrayResponseType = HttpResponse<IClientScAg[]>;

@Injectable({ providedIn: 'root' })
export class ClientScAgService {
  public resourceUrl = SERVER_API_URL + 'api/clients';

  constructor(protected http: HttpClient) {}

  create(client: IClientScAg): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .post<IClientScAg>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(client: IClientScAg): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .put<IClientScAg>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClientScAg>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClientScAg[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(client: IClientScAg): IClientScAg {
    const copy: IClientScAg = Object.assign({}, client, {
      dateAdded: client.dateAdded != null && client.dateAdded.isValid() ? client.dateAdded.format(DATE_FORMAT) : null,
      dateExpire: client.dateExpire != null && client.dateExpire.isValid() ? client.dateExpire.format(DATE_FORMAT) : null,
      dateState: client.dateState != null && client.dateState.isValid() ? client.dateState.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAdded = res.body.dateAdded != null ? moment(res.body.dateAdded) : null;
      res.body.dateExpire = res.body.dateExpire != null ? moment(res.body.dateExpire) : null;
      res.body.dateState = res.body.dateState != null ? moment(res.body.dateState) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((client: IClientScAg) => {
        client.dateAdded = client.dateAdded != null ? moment(client.dateAdded) : null;
        client.dateExpire = client.dateExpire != null ? moment(client.dateExpire) : null;
        client.dateState = client.dateState != null ? moment(client.dateState) : null;
      });
    }
    return res;
  }
}
