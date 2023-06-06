import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  items!: MenuItem[];
  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.intializeSideMenu();
  }

  intializeSideMenu() {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: ['/dashboard/default'],
      },
      {
        label: 'Products',
      },
      {
        label: 'Sales',
      },
      {
        label: 'Master',
        items: [
          {
            label: 'size',
            routerLink: ['/master/size'],
          },
        ],
      },
      {
        label: 'User',
      },
      {
        label: 'Reports',
      },
      {
        label: 'Settings',
      },
      {
        label: 'Invoice',
      },
      {
        label: 'Login',
      },
    ];
  }
}
