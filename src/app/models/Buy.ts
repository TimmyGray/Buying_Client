import {Image } from './image'

export class Buy{
    
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public cost: number,
    public item: string,
    public itemId: string,
    public count: number,
    public image:Image,
    public custom: boolean = false) { }

}
