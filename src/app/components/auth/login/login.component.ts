import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/auth.service';

import { DataService } from 'src/app/shared/services/data.service';
import { Global } from 'src/app/shared/services/global';
import { MustMatchValidator } from 'src/app/validations/validations.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  strMsg: string = '';
  registerForm!: FormGroup;

  submitted: boolean = false;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this._authService.logout();
    this.setLoginForm();
    this.setRegisterForm();
  }

  setLoginForm() {
    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  setRegisterForm() {
    this.registerForm = this._fb.group(
      {
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]),
        ],

        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]),
        ],

        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ]),
        ],

        userTypeId: [1],

        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ]),
        ],

        confirmPassword: ['', Validators.required],
      },
      {
        validators: MustMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  login() {
    if (this.loginForm.get('userName')?.value == '') {
      console.log('Username is required !!');
    } else if (this.loginForm.get('password')?.value == '') {
      console.log('Password is required !!');
    } else {
      if (this.loginForm.valid) {
        this._dataService
          .post(
            Global.BASE_API_PATH + 'UserMaster/Login/',
            this.loginForm.value
          )
          .subscribe((res) => {
            if (res.isSuccess) {
              this._authService.login(res.data);

              this.strMsg = this._authService.getMessage();

              if (this.strMsg !== '') {
                console.log(this.strMsg);
                this.loginForm.reset();
              }
            } else {
              console.log(res.errors[0]);
            }
          });
      } else {
        console.log('Invalid Crediantial !!');
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  register(formData: any) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this._dataService
      .post(Global.BASE_API_PATH + 'UserMaster/Save/', formData.value)
      .subscribe((res) => {
        if (res.isSuccess) {
          console.log('Registration has been done !!');
          //this._toastr.success('Registration has been done !!', 'Register');
          this.registerForm.reset({
            firstName: '',
            lastName: '',
            email: '',
            userTypeId: 1,
            password: '',
            confirmPassword: '',
          });
          this.submitted = false;
        } else {
          console.log(res.errors[0]);
          //this._toastr.error(res.errors[0], 'Register');
        }
      });
  }
}
