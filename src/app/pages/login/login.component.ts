import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {Credentials} from "../../models/credentials.model";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({username: new FormControl(), password: new FormControl()});

  constructor(private _http: HttpClient,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.valid) {
      let credentials : Credentials = new Credentials(
        this.form.get('username')?.value,
        this.form.get('password')?.value)

      this.loginService.authenticate(credentials, () => {
        alert('funcionou')
      })
    }
    return false;
  }
}
