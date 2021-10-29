import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
@Component({
  selector: 'app-feather-icon',
  templateUrl: './feathericon.component.html',
  styleUrls: ['./feathericon.component.scss']
})
export class FeathericonComponent implements OnInit,AfterViewInit {

  @Input('icon') public feathericon;
  constructor() { }

  ngOnInit(): void {
    //feather.replace(); don't put it in here 
  }


  ngAfterViewInit() {
    feather.replace();
  }

}
