import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {LoginService} from '../../services/LoginService';
import {LoginTokenManager} from '../../services/LoginTokenManager';
import {DjangoUser} from '../../models/DjangoUser';

/**
 * Component to make login into django rest api.
 */
@Component({
  selector: 'django-rest-login',
  templateUrl: './django-rest-login.component.html',
  styleUrls: ['./django-rest-login.component.css']
})
export class DjangoRestLoginComponent {

  protected form: FormGroup;

  protected errors = this.getErrorMessagesDefault();

  @Input() url;
  @Output() onLogin : EventEmitter<any> = new EventEmitter();

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
    this.assertUrlIsDefined();
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

  protected getUrlUndefinedText() {
    return 'Login wasn\'t possible: Url is not defined!';
  }

  protected makeLogin(username: String, password: String) {
    this.cleanErrorMessages();
    let user = new DjangoUser(username, password);
    this.login.authenticate(this.url, user)
      .subscribe(
        data => {
          LoginTokenManager.set(data.token);
          this.onLogin.emit(data);
        },
        error => {
          let body = JSON.parse(error._body);
          console.log(body);
          if (typeof (body.username) != 'undefined') {
            this.errors.username = body.username[0];
          }
          if (typeof (body.password) != 'undefined') {
            this.errors.password = body.password[0];
          }
          if (typeof (body.non_field_errors) != 'undefined') {
            this.errors.non_field_errors = body.non_field_errors[0];
          }
          console.log(this.errors);
        }
      );
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
      throw this.getUrlUndefinedText();
    }
  }

}
