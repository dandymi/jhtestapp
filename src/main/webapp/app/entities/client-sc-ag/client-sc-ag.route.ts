import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClientScAg } from 'app/shared/model/client-sc-ag.model';
import { ClientScAgService } from './client-sc-ag.service';
import { ClientScAgComponent } from './client-sc-ag.component';
import { ClientScAgDetailComponent } from './client-sc-ag-detail.component';
import { ClientScAgUpdateComponent } from './client-sc-ag-update.component';
import { ClientScAgDeletePopupComponent } from './client-sc-ag-delete-dialog.component';
import { IClientScAg } from 'app/shared/model/client-sc-ag.model';

@Injectable({ providedIn: 'root' })
export class ClientScAgResolve implements Resolve<IClientScAg> {
  constructor(private service: ClientScAgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClientScAg> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ClientScAg>) => response.ok),
        map((client: HttpResponse<ClientScAg>) => client.body)
      );
    }
    return of(new ClientScAg());
  }
}

export const clientRoute: Routes = [
  {
    path: '',
    component: ClientScAgComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClientScAgDetailComponent,
    resolve: {
      client: ClientScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClientScAgUpdateComponent,
    resolve: {
      client: ClientScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClientScAgUpdateComponent,
    resolve: {
      client: ClientScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const clientPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ClientScAgDeletePopupComponent,
    resolve: {
      client: ClientScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.client.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
