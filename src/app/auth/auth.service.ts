import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private currentUserSubject = new BehaviorSubject<any>(null); // For token use

  private loggedIn = new BehaviorSubject<boolean>(false);

  private message: string = '';

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(objUserDetails: any) {
    if (objUserDetails.id == 0) {
      this.message = 'Please enter valid username and password !!';
      this.loggedIn.next(false);
      this.currentUserSubject.next(null);
      localStorage.clear();
    } else {
      this.message = '';
      this.loggedIn.next(true);
      this.currentUserSubject.next(objUserDetails);
      localStorage.setItem('userDetails', JSON.stringify(objUserDetails));
      this.router.navigate(['dashboard/default']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
  }

  getMessage(): string {
    return this.message;
  }
}
