import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';
import { SCAgentScAgService } from './sc-agent-sc-ag.service';
import { SCAgentScAgComponent } from './sc-agent-sc-ag.component';
import { SCAgentScAgDetailComponent } from './sc-agent-sc-ag-detail.component';
import { SCAgentScAgUpdateComponent } from './sc-agent-sc-ag-update.component';
import { SCAgentScAgDeletePopupComponent } from './sc-agent-sc-ag-delete-dialog.component';
import { ISCAgentScAg } from 'app/shared/model/sc-agent-sc-ag.model';

@Injectable({ providedIn: 'root' })
export class SCAgentScAgResolve implements Resolve<ISCAgentScAg> {
  constructor(private service: SCAgentScAgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISCAgentScAg> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SCAgentScAg>) => response.ok),
        map((sCAgent: HttpResponse<SCAgentScAg>) => sCAgent.body)
      );
    }
    return of(new SCAgentScAg());
  }
}

export const sCAgentRoute: Routes = [
  {
    path: '',
    component: SCAgentScAgComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhtestappApp.sCAgent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SCAgentScAgDetailComponent,
    resolve: {
      sCAgent: SCAgentScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.sCAgent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SCAgentScAgUpdateComponent,
    resolve: {
      sCAgent: SCAgentScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.sCAgent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SCAgentScAgUpdateComponent,
    resolve: {
      sCAgent: SCAgentScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.sCAgent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sCAgentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SCAgentScAgDeletePopupComponent,
    resolve: {
      sCAgent: SCAgentScAgResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhtestappApp.sCAgent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
