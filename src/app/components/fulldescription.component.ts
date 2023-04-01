import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParsingService } from '../services/parsing.service';


@Component({

  selector: 'full-des',
  templateUrl: `./htmls/fulldescription.component.html`

})
export class FullDescriptionComponent implements OnInit {
  ngOnInit(): void { }

  parseditem: string[];
  firstconn: string[];
  secondconn: string[];
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly parsingservice: ParsingService
  ) {

    this.parseditem = new Array<string>();
    this.firstconn = new Array<string>();
    this.secondconn = new Array<string>();
    this.parseditem = this.parsingservice.parseItem(this.data.curbuy.item, ";");
    this.firstconn = this.parsingservice.parseItem(this.parseditem[0], ",");
    this.secondconn = this.parsingservice.parseItem(this.parseditem[1],",");

  }

}
