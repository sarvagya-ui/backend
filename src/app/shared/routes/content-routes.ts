import { Routes } from '@angular/router';

export const contentRoute: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'master',
    loadChildren: () =>
      import('../../components/master/master.module').then(
        (m) => m.MasterModule
      ),
  },
];
