import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'src/app/components/user/create-user/create-user.component';
import { ListUserComponent } from 'src/app/components/user/list-user/list-user.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'create-user', component: CreateUserComponent },
      { path: 'list-user', component: ListUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
