import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from 'primeng/api';
import { PrimeModule } from 'src/app/prime.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListUserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
