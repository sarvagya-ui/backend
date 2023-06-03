import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  sidebarVisible: boolean = true;

  constructor() {}
}
