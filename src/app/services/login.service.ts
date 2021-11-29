import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http : HttpClient) { }

  authenticate(credentials: {username: string, password: string }, callback: () => any) {
    this._http.post<{access_token: string}>(environment.url + 'login', credentials).subscribe(
      response => {
        !!response['access_token']
          ? localStorage.setItem('access_token', response!['access_token'])
          : localStorage.removeItem('access_token')
        return callback && callback();
      }
    )
  }

  isAuthenticated() {
    return !!localStorage.getItem("acess_token")
  }

}
