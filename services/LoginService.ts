import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { DjangoUser } from '../models/DjangoUser';
import {LoginTokenManager} from './LoginTokenManager';
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {
  
  constructor(private http: Http) { }

  public authenticate(url, user : DjangoUser) {
    let json = user.toJson();
    console.log(url);
    console.log(json);
    let options = this.getRequestOptions();
    return this.http.post(url, json, options).map((res) => res.json());
  }

  protected getRequestOptions() {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  public isLoggedIn() {
    let token = LoginTokenManager.get();
    return token != null && typeof(token) == 'string' && token.length;
  }

  public logout() {
    LoginTokenManager.remove();
  }

}
