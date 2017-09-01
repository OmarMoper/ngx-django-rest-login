class BaseError {
  public message;
  public name;
  constructor () {
    Error.apply(this, arguments);
  }
}

BaseError.prototype = new Error();

export class UrlUndefinedError extends BaseError {
  constructor() {
    super();
    this.name = 'UrlUndefinedError';UrlUndefinedError
    this.message = 'Login wasn\'t possible: Url is not defined!';
  }
}

export class UserAlreadyLoggedInError extends BaseError {
  constructor() {
    super();
    this.name = 'UserAlreadyLoggedInError';
    this.message = 'User is already logged in';
  }
}
