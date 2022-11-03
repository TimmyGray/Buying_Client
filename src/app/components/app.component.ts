import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './htmls/app.component.html',
  styleUrls: ['../styles/app.component.css']
})
export class AppComponent {
  message = 'Staff_buying_client';

  SendMessage() {

    alert("Send");

  }
}
