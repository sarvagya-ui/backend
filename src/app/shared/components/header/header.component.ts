import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
  constructor(public navService: NavService) {}

  ngOnInit(): void {
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

  openSideBar() {
    this.open = !this.open;
    console.log(this.open);

    //this.navService.sidebarVisible = !this.navService.sidebarVisible;
  }

  logout() {}
}
