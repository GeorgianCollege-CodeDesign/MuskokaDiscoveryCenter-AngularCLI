import { Component } from '@angular/core';
import { CamperService } from "./camper.service";
import {Camper} from "./camper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CamperService]
})

export class AppComponent {
  title = 'app works!';

  constructor() {
  }

}
