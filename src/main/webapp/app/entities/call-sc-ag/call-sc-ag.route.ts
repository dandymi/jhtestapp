import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CallScAg } from 'app/shared/model/call-sc-ag.model';
import { CallScAgService } from './call-sc-ag.service';
import { CallScAgComponent } from './call-sc-ag.component';
import { CallScAgDetailComponent } from './call-sc-ag-detail.component';
import { CallScAgUpdateComponent } from './call-sc-ag-update.component';
import { CallScAgDeletePopupComponent } from './call-sc-ag-delete-dialog.component';
import { ICallScAg } from 'app/shared/model/call-sc-ag.model';

@Injectable({ providedIn: 'root' })
export class CallScAgResolve implements Resolve<ICallScAg> {
  constructor(private service: CallScAgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICallScAg> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CallScAg>) => response.ok),
        map((call: HttpResponse<CallScAg>) => call.body)
      );
    }
    return of(new CallScAg());
  }
}

export const callRoute: Routes = [
  {
    path: '',
    component: CallScAgComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.call.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CallScAgDetailComponent,
    resolve: {
      call: CallScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.call.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CallScAgUpdateComponent,
    resolve: {
      call: CallScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.call.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CallScAgUpdateComponent,
    resolve: {
      call: CallScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.call.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const callPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CallScAgDeletePopupComponent,
    resolve: {
      call: CallScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.call.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
