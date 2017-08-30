import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {LoginService} from '../../services/LoginService';
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

  @Input() url;

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
    let user = new DjangoUser(username, password);
    this.login.authenticate(this.url, user).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  protected assertUrlIsDefined() {
    if (this.url == null) {
      throw this.getUrlUndefinedText();
    }
  }

}
