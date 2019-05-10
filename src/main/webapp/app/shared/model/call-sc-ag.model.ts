import { Moment } from 'moment';
import { ICallHistoryScAg } from 'app/shared/model/call-history-sc-ag.model';

export const enum CallState {
  NEW = 'NEW',
  WAITING = 'WAITING',
  POS_CLOSED = 'POS_CLOSED',
  NEG_CLOSED = 'NEG_CLOSED',
  MANAGING = 'MANAGING'
}

export interface ICallScAg {
  id?: number;
  dateCall?: Moment;
  stateCall?: CallState;
  histories?: ICallHistoryScAg[];
}

export class CallScAg implements ICallScAg {
  constructor(public id?: number, public dateCall?: Moment, public stateCall?: CallState, public histories?: ICallHistoryScAg[]) {}
}
