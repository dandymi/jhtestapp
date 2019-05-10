import { Moment } from 'moment';
import { IClientScAg } from 'app/shared/model/client-sc-ag.model';

export interface ISCAgentScAg {
  id?: number;
  firstName?: string;
  lastName?: string;
  mobilePhone?: string;
  email?: string;
  scCodeCitizen?: string;
  iban?: string;
  expireDateSContract?: Moment;
  clients?: IClientScAg[];
}

export class SCAgentScAg implements ISCAgentScAg {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public mobilePhone?: string,
    public email?: string,
    public scCodeCitizen?: string,
    public iban?: string,
    public expireDateSContract?: Moment,
    public clients?: IClientScAg[]
  ) {}
}
