import { Iitem } from "./item.interface";

export class Connector implements Iitem {

  constructor(
    public _id: string,
    public name: string,
    public type: string,
    public count:number) { }

}
