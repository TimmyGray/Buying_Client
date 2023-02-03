import { Connector, CoreNumber } from "./enums";

export class Wire {

  constructor(
    public _id: string,
    public name: string,
    public length: number,
    public type: string,
    public firstcon: string,
    public secondcon: string) { }

}
