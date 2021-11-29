import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Credentials} from "../models/credentials.model";
import jwtDecode from "jwt-decode";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {EventEmitterService} from "./event-emitter.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http : HttpClient,
              private _router: Router) { }

  authenticate(credentials: Credentials, callback: (user: User) => any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = 'username='+credentials.username+'&password='+credentials.password;
    this._http.post<{access_token: string}>(environment.url + 'login', body, {headers: headers}).subscribe(
      response => {
        const token = response['access_token'];
        !!response['access_token']
          ? localStorage.setItem('access_token', token)
          : localStorage.removeItem('access_token')
        let user : User = jwtDecode<User>(token);
        EventEmitterService.get('authenticate').emit(true);
        return callback && callback(user);
      }
    )
  }

  isAuthenticated() {
    return !!localStorage.getItem("access_token")
  }

  logout() {
    localStorage.removeItem("access_token");
    EventEmitterService.get('authenticate').emit(false);
    this._router.navigateByUrl("").then(r => r);
  }

  getToken() {
    return localStorage.getItem("access_token");
  }
}
