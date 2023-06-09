import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Global } from 'src/app/shared/services/global';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  open: boolean = true;
  sidebarVisible: boolean = false;
  imagePath = "assets/images/user.png";

  constructor(public navService: NavService) { }

  ngOnInit(): void {
    this.headerPopUp();
    this.fetchUserDetails();
  }

  headerPopUp() {
    this.items = [
      {
        label: 'Setting',
        icon: 'pi pi-cog',
      },
      {
        label: 'Sign out',
        icon: 'pi pi-sign-out',
      },
    ];
  }

  fetchUserDetails() {
    let userDetails = JSON.parse(localStorage.getItem("userDetails") as string);
    this.imagePath = (userDetails.imagePath == "" || userDetails.imagePath == null) ? "assets/images/user.png" : Global.BASE_USERS_IMAGES_PATH + userDetails.imagePath;
  }


  logout() { }
}
