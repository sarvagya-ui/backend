import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import {FeathericonComponent} from '../feathericon/feathericon.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  open: boolean = false;
  openNav: boolean = false;
  constructor(private _navService: NavService) { }

  ngOnInit(): void {

  }

  collapseSidebar() {
    this.open = !this.open;
    this._navService.collaspeSidebar = !this._navService.collaspeSidebar;
  }

  openMobileNav(){
    this.openNav = !this.openNav;
  }
}
