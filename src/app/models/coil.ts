import { Iitem } from './item.interface';

export class Coil implements Iitem {

  constructor(

    public id: string,
    public name: string,
    public type: string,
    public length: number) {

  }

}
