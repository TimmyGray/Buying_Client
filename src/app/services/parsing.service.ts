import { Injectable } from "@angular/core";

@Injectable({

  providedIn: "root"

})
export class ParsingService {

  constructor() { }

  parseItem(stringtoparse: string, splitchar: string): string[] {

    return stringtoparse.split(splitchar);

  }

}
