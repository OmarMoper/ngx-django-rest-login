import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {LoginService} from '../../services/LoginService';
import {LoginTokenManager} from '../../services/LoginTokenManager';
import {DjangoUser} from '../../models/DjangoUser';
import {UserAlreadyLoggedInError, UrlUndefinedError } from '../../models/Error';

/**
 * Component to make login into django rest api.
 */
@Component({
  selector: 'django-rest-login',
  templateUrl: './django-rest-login.component.html',
  styleUrls: ['./django-rest-login.component.css']
})
export class DjangoRestLoginComponent implements OnInit {

  protected form: FormGroup;

  protected errors = this.getErrorMessagesDefault();

  ngOnInit() {
    this.assertUrlIsDefined();
  }

  @Input() url;
  @Output() onLogin : EventEmitter<any> = new EventEmitter();
  @Output() onError : EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private login: LoginService) {
    this.form = this.formBuilder.group({
      "username": "",
      "password": ""
    });
  }

  /**)
   * Authenticate user into django.
   */
  onSubmit() {
    let username = this.getFormUserValue();
    let password = this.getFormPasswordValue();
    this.makeLogin(username, password);
  }

  protected getFormUserValue() {
    return this.form.controls['username'].value;
  }

  protected getFormPasswordValue() {
    return this.form.controls['password'].value;
  }

  protected makeLogin(username: String, password: String) {
    this.cleanErrorMessages();
    let user = new DjangoUser(username, password);
    try {
      this.login.authenticate(this.url, user)
        .subscribe(
          data => {
            LoginTokenManager.set(data.token);
            this.onLogin.emit(data);
          },
          error => {
            let body = JSON.parse(error._body);
            this.refreshErrorMessage(body);
            this.onError.emit(body);
          }
        );
    }
    catch (e) {
      if (e instanceof UserAlreadyLoggedInError) {
        this.errors.non_field_errors = e.message;
      }
    }

  }

  protected refreshErrorMessage(body) {
    if (typeof (body.username) != 'undefined') {
      this.errors.username = body.username[0];
    }
    if (typeof (body.password) != 'undefined') {
      this.errors.password = body.password[0];
    }
    if (typeof (body.non_field_errors) != 'undefined') {
      this.errors.non_field_errors = body.non_field_errors[0];
    }
  }

  protected cleanErrorMessages() {
    this.errors = this.getErrorMessagesDefault();
  }

  protected getErrorMessagesDefault() {
    return {
      username: null,
      password: null,
      non_field_errors: null
    }
  }
  

  protected assertUrlIsDefined() {
    if (this.url == null) {
      throw new UrlUndefinedError();
    }
  }

}
