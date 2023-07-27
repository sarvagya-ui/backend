import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { DBOperation } from 'src/app/shared/services/db-operation';
import { Global } from 'src/app/shared/services/global';
import { MustMatchValidator } from 'src/app/validations/validations.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userId!: number;
  addForm!: FormGroup;
  submitted: boolean = false;
  objUserTypes: any;
  buttonText !: string;
  dbops !: DBOperation



  constructor(private route: ActivatedRoute, private _dataService: DataService,
    private _fb: FormBuilder, private navRouter: Router) {
  }

  ngOnInit() {
    //use the below line to hide id from URL
    //in list user component on edit button this.navRoute.navigate(['/users/create-user'], { state: { userId: id } });
    //const userId = history.state.userId;
    this.setFormState();
    this.getUserTypes();

    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId && this.userId != null && this.userId > 0) {
        this.dbops = DBOperation.update;
        this.buttonText = 'update';
        this.getUserById();
      }
    });
  }

  setFormState() {
    this.dbops = DBOperation.create;
    this.buttonText = "Submit";
    this.addForm = this._fb.group(
      {
        id: [''],
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

        userTypeId: ['', Validators.required],

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

  get f() {
    return this.addForm.controls;
  }

  getUserById() {
    this._dataService.get(Global.BASE_API_PATH + "UserMaster/GetbyId/" + this.userId).subscribe(res => {
      if (res.isSuccess) {
        this.addForm.patchValue(res.data);
      } else {
        console.log('res.errors[0], "User Master"');
        //this._toastr.error(res.errors[0], "User Master");
      }

    });

  }


  getUserTypes() {
    this._dataService.get(Global.BASE_API_PATH + "UserType/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objUserTypes = res.data;
      } else {
        //this._toastr.error(res.errors[0], "Tag Master");
        console.log(res.errors[0], "User type");
      }
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    switch (this.dbops) {
      case DBOperation.create:
        this._dataService.post(Global.BASE_API_PATH + "UserMaster/Save/", formData.value).subscribe(res => {
          if (res.isSuccess) {
            if (res.data == -1) {
              console.log("Email Id already exists !!", "Add User");
              //this._toastr.error("Email Id already exists !!", "Add User");
              return;
            } else {
              console.log("Email Id already exists !!", "Add User");
              //this._toastr.success("Data Saved Successfully !!", "Add User");
              this.addForm.reset();
              this.submitted = false;
              this.navRouter.navigate(["/users/list-user"]);
            }
          } else {
            //this._toastr.error(res.errors[0], "Add User");
            console.log(res.errors[0], "Add User");
          }
        });
        break;
      case DBOperation.update:
        this._dataService.post(Global.BASE_API_PATH + "UserMaster/Update/", formData.value).subscribe(res => {
          if (res.isSuccess) {
            if (res.data == -1) {
              //this._toastr.error("Email Id already exists !!", "Add User");
              console.log("Email Id already exists !!", "Add User");
              return;
            }
            if (res.data == -2) {
              console.log("User doest not exists !!", "Add User");
              //this._toastr.error("User doest not exists !!", "Add User");
              return;
            } else {
              console.log("Data Updated Successfully !!", "Add User");
              //this._toastr.success("Data Updated Successfully !!", "Add User");
              this.addForm.reset();
              this.submitted = false;
              this.navRouter.navigate(["/users/list-user"]);
            }
          } else {
            //this._toastr.error(res.errors[0], "Add User");
            console.log(res.errors[0], "Add User");
          }
        });
    }
  }
}
