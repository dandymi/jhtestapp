import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sc-agent-sc-ag',
        loadChildren: './sc-agent-sc-ag/sc-agent-sc-ag.module#JhtestappSCAgentScAgModule'
      },
      {
        path: 'client-sc-ag',
        loadChildren: './client-sc-ag/client-sc-ag.module#JhtestappClientScAgModule'
      },
      {
        path: 'call-sc-ag',
        loadChildren: './call-sc-ag/call-sc-ag.module#JhtestappCallScAgModule'
      },
      {
        path: 'call-history-sc-ag',
        loadChildren: './call-history-sc-ag/call-history-sc-ag.module#JhtestappCallHistoryScAgModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestappEntityModule {}
