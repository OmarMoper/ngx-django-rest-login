const TOKEN_VAR_NAME = 'ngx-django-user-login-token';

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
    localStorage.setItem(TOKEN_VAR_NAME, token);
  }

  /**
   * Get token from cookie.
   * 
   * @return string
   *   Token.
   */
  static get(): string {
    return localStorage.getItem(TOKEN_VAR_NAME);
  }

  /**
   * Get token from cookie.
   * 
   * @return string
   *   Token.
   */
  static remove() {
    localStorage.removeItem(TOKEN_VAR_NAME);
  }

}
