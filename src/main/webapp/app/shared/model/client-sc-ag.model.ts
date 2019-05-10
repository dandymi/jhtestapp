import { Moment } from 'moment';

export const enum ClientState {
  EVALUATING = 'EVALUATING',
  APPROVED = 'APPROVED',
  NOT_APPROVED = 'NOT_APPROVED',
  ARCHIVED = 'ARCHIVED'
}

export interface IClientScAg {
  id?: number;
  denomination?: string;
  vatCode?: string;
  webSite?: string;
  notes?: string;
  dateAdded?: Moment;
  dateExpire?: Moment;
  state?: ClientState;
  dateState?: Moment;
  notesState?: string;
  sCAgentId?: number;
  callId?: number;
}

export class ClientScAg implements IClientScAg {
  constructor(
    public id?: number,
    public denomination?: string,
    public vatCode?: string,
    public webSite?: string,
    public notes?: string,
    public dateAdded?: Moment,
    public dateExpire?: Moment,
    public state?: ClientState,
    public dateState?: Moment,
    public notesState?: string,
    public sCAgentId?: number,
    public callId?: number
  ) {}
}
