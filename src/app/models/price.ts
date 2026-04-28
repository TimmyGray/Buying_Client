import { Iitem } from "./item.interface";

export class Price {
  constructor(
    public id: string,
    public name: string,
    public cost: number,
    public itemOfPrice: Iitem
  ) { }

}
