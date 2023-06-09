import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { MenuItem } from 'primeng/api';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  items!: MenuItem[];
  imagePath = "assets/images/user.png";
  fullName: string = '';
  constructor(public navService: NavService) { }


  ngOnInit(): void {
    this.intializeSideMenu();
    this.fetchUserDetails();
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
            label: 'Brand Logo Master',
            routerLink: ['/masters/brandlogo'],
          },
          {
            label: 'Color Master',
            routerLink: ['/masters/color'],
          },
          {
            label: 'Size Master',
            routerLink: ['/masters/size'],
          },
          {
            label: 'Tag Master',
            routerLink: ['/masters/tag'],
          },
          {
            label: 'User Type Master',
            routerLink: ['/masters/usertype'],
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

  fetchUserDetails() {
    let userDetails = JSON.parse(localStorage.getItem("userDetails") as string);
    this.imagePath = (userDetails.imagePath == "" || userDetails.imagePath == null) ? "assets/images/user.png" : Global.BASE_USERS_IMAGES_PATH + userDetails.imagePath;

    this.fullName = `${userDetails.firstName} ${userDetails.lastName}`;
  }

}
