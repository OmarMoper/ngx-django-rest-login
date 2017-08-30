import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DjangoRestLoginComponent } from './components/django-rest-login/django-rest-login.component';

import { LoginService } from './services/LoginService';
import { LoginTokenManager } from './services/LoginTokenManager';
    
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    LoginTokenManager
  ],
  declarations: [DjangoRestLoginComponent],
  exports: [DjangoRestLoginComponent]
})
export class NgxDjangoRestLoginModule { }
