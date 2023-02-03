import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({

  selector: 'full-des',
  templateUrl: `./htmls/fulldescription.component.html`

})
export class FullDescriptionComponent implements OnInit {
  ngOnInit(): void { }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

}
