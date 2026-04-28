import { Injectable } from "@angular/core";

@Injectable({

  providedIn: "root"

})
export class ParsingService {

  constructor() { }

  /** Splits a packed buy item string into fields using the provided delimiter. */
  parseItem(stringtoparse: string, splitchar: string): string[] {

    return stringtoparse.split(splitchar);

  }

}
