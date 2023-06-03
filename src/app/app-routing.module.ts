import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { ContentLayoutComponent } from 'src/app/shared/layout/content-layout/content-layout.component';
import { contentRoute } from 'src/app/shared/routes/content-routes';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: contentRoute,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
