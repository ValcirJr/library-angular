import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Author} from "../models/author.model";
import {environment} from "../../environments/environment";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _http : HttpClient,
              private _loginService: LoginService) {}

  findAuthors(callback : (authors : Author[]) => any) {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this._loginService.getToken() ?? ''});
    this._http.get<Author[]>(environment.url + "authors", {headers: header}).subscribe((res) => {
      return callback(res);
    });
  }

}
