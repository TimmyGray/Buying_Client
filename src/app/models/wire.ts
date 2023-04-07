import { Connector } from './connector'

export class Wire {

  constructor(
    public _id: string,
    public name: string,
    public length: number,
    public type: string,
    public firstconn: Connector[],
    public secondconn: Connector[],
    public numberofconnectors:number) { }

}
