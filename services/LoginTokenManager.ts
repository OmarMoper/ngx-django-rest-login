import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import {Cookie} from 'ng2-cookies/ng2-cookies';

const TOKEN_COOKIE_NAME = 'ngx-django-user-login-token';

/**
 * Manage login tokens.
 */
export class LoginTokenManager {
  
  /**
   * Save token as a cookie.
   * 
   * @param string token
   *   Token.
   */
  static set(token:string):void {
    Cookie.set(TOKEN_COOKIE_NAME, token, 1);//Expiration: 1 day
  }

  /**
   * Get token from cookie.
   * 
   * @return string
   *   Token.
   */
  static get(): string {
      return Cookie.get(TOKEN_COOKIE_NAME);
  }

  /**
   * Get token from cookie.
   * 
   * @return string
   *   Token.
   */
  static remove() {
      Cookie.delete(TOKEN_COOKIE_NAME);
  }

}
