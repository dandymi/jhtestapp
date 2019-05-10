import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';
import { CallHistoryScAgService } from './call-history-sc-ag.service';
import { CallHistoryScAgComponent } from './call-history-sc-ag.component';
import { CallHistoryScAgDetailComponent } from './call-history-sc-ag-detail.component';
import { CallHistoryScAgUpdateComponent } from './call-history-sc-ag-update.component';
import { CallHistoryScAgDeletePopupComponent } from './call-history-sc-ag-delete-dialog.component';
import { ICallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';

@Injectable({ providedIn: 'root' })
export class CallHistoryScAgResolve implements Resolve<ICallHistoryScAg> {
  constructor(private service: CallHistoryScAgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICallHistoryScAg> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CallHistoryScAg>) => response.ok),
        map((callHistory: HttpResponse<CallHistoryScAg>) => callHistory.body)
      );
    }
    return of(new CallHistoryScAg());
  }
}

export const callHistoryRoute: Routes = [
  {
    path: '',
    component: CallHistoryScAgComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.callHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CallHistoryScAgDetailComponent,
    resolve: {
      callHistory: CallHistoryScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.callHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CallHistoryScAgUpdateComponent,
    resolve: {
      callHistory: CallHistoryScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.callHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CallHistoryScAgUpdateComponent,
    resolve: {
      callHistory: CallHistoryScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.callHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const callHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CallHistoryScAgDeletePopupComponent,
    resolve: {
      callHistory: CallHistoryScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.callHistory.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
