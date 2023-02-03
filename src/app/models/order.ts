import { Client } from './client';
import { OrderStatus } from './enums';
import { Buy } from './Buy';

export class Order {

  constructor(
    public _id: string,
    public client: Client,
    public name: string,
    public created: Date,
    public status: OrderStatus,
    public buys: Array<Buy>) { }

}
