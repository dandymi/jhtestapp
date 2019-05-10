import { Moment } from 'moment';

export const enum ClientAction {
  FIRST_MAIL = 'FIRST_MAIL',
  SECOND_MAIL = 'SECOND_MAIL',
  CALL = 'CALL',
  REJECT = 'REJECT'
}

export interface ICallHistoryScAg {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  action?: ClientAction;
  callId?: number;
}

export class CallHistoryScAg implements ICallHistoryScAg {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public action?: ClientAction,
    public callId?: number
  ) {}
}
