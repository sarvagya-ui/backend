import { Injectable } from '@angular/core';
//importing data of menu in shared>service
import { Menu } from "./menu";






@Injectable({
  providedIn: 'root'
})
export class NavService {

  collaspeSidebar: boolean = false;// will toggle with the value to show or hide side navagiation bar

  constructor() { }

  MENUITEMS: Menu[] = [
    { path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', active: true },
    {
      title: 'Products', icon: 'box', type: 'sub', active: false, children:
        [
          {
            title: 'Physical', type: 'sub', children: [
              { path: '/product/physical/product-list', title: 'Product list', type: 'link' },
              { path: '/product/physical/add-product', title: 'Add product', type: 'link' }
            ]
          }
        ]
    },
    {
      title: 'sales', icon: 'dollar-sign', type: 'sub', active: false, children:
        [
          { path: '/sales/orders', title: 'Orders', type: 'link' },
          { path: '/sales/transactions', title: 'Transactions', type: 'link' }
        ]
    },
    {
      title: 'master', icon: 'clipboard', type: 'sub', active: false, children:
        [
          { path: '/master/brandlogo', title: 'Brandlogo', type: 'link' },
          { path: '/master/category', title: 'Category', type: 'link' },
          { path: '/master/color', title: 'Color', type: 'link' },
          { path: '/master/size', title: 'Size', type: 'link' },
          { path: '/masters/tag', title: 'Tag', type: 'link' },
          { path: '/masters/usertype', title: 'User Type', type: 'link' }
        ]
    },
    {
      title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
        { path: '/users/list-user', title: 'List User', type: 'link' },
        { path: '/users/create-user', title: 'Create User', type: 'link' },
      ]
    },

    { path: '/reports', title: 'Reports', icon: 'bar-chart', type: 'link', active: false},

    {
      title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
        { path: '/settings/profile', title: 'Profile', type: 'link' }
      ]
    },

    { path: '/invoice', title: 'Invoice', icon: 'archive', type: 'link', active: false},

    { path: '/auth/login', title: 'Logout', icon: 'log-out', type: 'link', active: false}

  ];
}
