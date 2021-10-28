import { Component, OnInit } from '@angular/core';
import {NavService} from '../../services/nav.service';
//
import { Menu } from '../../services/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems:Menu[];
  fullanme:string;
  userType:string;

  constructor(public _navService: NavService) {
    
   }

  ngOnInit(): void {
    this.menuItems = this._navService.MENUITEMS;
    this.fullanme ="Sarvagya Pandey";
    this.userType="Admin";
  }

  //Click menu toggle
  toggleNavActive(item : any){
      item.active = !item.active;
  }

  

}
