import {Image } from './image'

export class Buy{
    
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public cost: number,
    public item: string,
    public itemid: string,
    public count: number,
    public image:Image) { }

}
