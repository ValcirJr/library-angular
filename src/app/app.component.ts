import { Component } from '@angular/core';
import {LoginService} from "./services/login.service";
import {EventEmitterService} from "./services/event-emitter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'library';
  authenticated : boolean;


  constructor(private loginService: LoginService ) {
    this.authenticated = this.loginService.isAuthenticated();
    EventEmitterService.get('authenticate').subscribe(data =>  this.authenticated = data);
  }

  logout() {
    this.loginService.logout();
  }
}
