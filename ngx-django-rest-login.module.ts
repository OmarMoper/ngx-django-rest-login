import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DjangoRestLoginComponent } from './components/django-rest-login/django-rest-login.component';

import { LoginService } from './services/LoginService';
import { TokenService } from './services/TokenService';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    TokenService
  ],
  declarations: [DjangoRestLoginComponent],
  exports: [DjangoRestLoginComponent]
})
export class NgxDjangoRestLoginModule { }
