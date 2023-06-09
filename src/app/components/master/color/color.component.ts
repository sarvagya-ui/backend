import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DataService } from 'src/app/shared/services/data.service';
import { DBOperation } from 'src/app/shared/services/db-operation';
import { Global } from 'src/app/shared/services/global';
import {
  NoWhiteSpaceValidator,
  OnlyCharFiledValidator,
} from 'src/app/validations/validations.validator';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  items!: MenuItem[];
  activeIndex: number = 0;
  addForm!: FormGroup;
  objRows: any;
  cols!: any[];
  totalRecords!: number
  buttonText: string = "Submit";
  objRow: any;
  dbops !: DBOperation;
  formErrors: any = {
    name: '',
    code: ''
  };

  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Name cannot be leass than 1 chars long',
      maxlength: 'Name cannot be more than 10 chars long',
      validOnlyCharFiled: 'Name must be contains only latters',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    },
    code: {
      required: 'Code is required',
      minlength: 'Code cannot be leass than 1 chars long',
      maxlength: 'Code cannot be more than 10 chars long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    }
  };


  constructor(private _fb: FormBuilder, private _dataService: DataService) { }

  ngOnInit(): void {
    this.activeIndex = 1;
    this.setFormState();
    this.getData();
  }


  setFormState() {
    this.dbops = DBOperation.create;
    this.buttonText = "Submit";
    this.addForm = this._fb.group({
      id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        OnlyCharFiledValidator.validOnlyCharFiled,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      code: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])]

    });

    //note this will not work for required error , you need to handle that in Html only
    this.addForm.valueChanges.subscribe(() => {
      this.onValueChanged();
    });
  }

  onValueChanged() {
    if (!this.addForm) {
      return;
    }

    for (const filed of Object.keys(this.formErrors)) {
      //filed == 'name'
      this.formErrors[filed] = "";
      const control = this.addForm.get(filed);
      if (control && control.dirty && !control.valid) {
        //getting all errors for name
        const message = this.validationMessages[filed];
        //getting field name  with error, i.e. name
        const control: any = this.addForm.get(filed);
        for (const key of Object.keys(control.errors)) {
          if (key !== 'required') {
            this.formErrors[filed] += message[key] + ' ';
          }
        }
      }
    }
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        this._dataService.post(Global.BASE_API_PATH + "UserType/Save/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            //this._toastr.success("Data Saved Successfully !!", "Tag Master");
            console.log("Data Saved Successfully !!", "Tag Master");
            this.setForm();
          } else {
            //this._toastr.error(res.errors[0], "Tag Master");
            console.log(res.errors[0], "Tag Master");
          }
        });
        break;
      case DBOperation.update:
        this._dataService.post(Global.BASE_API_PATH + "UserType/Update/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            //this._toastr.success("Data Updated Successfully !!", "Tag Master");
            console.log("Data Updated Successfully !!", "Tag Master");
            this.setForm();
          } else {
            //this._toastr.error(res.errors[0], "Tag Master");
            console.log(res.errors[0], "Tag Master");
          }
        });
    }

  }

  setForm() {
    this.addForm.reset({
      id: 0,
      name: ''
    });

    this.dbops = DBOperation.create;
    this.buttonText = "Submit";
    this.activeIndex = 1;
    this.getData();
  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "UserType/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
        this.totalRecords = this.objRows.length;
      } else {
        //this._toastr.error(res.errors[0], "Tag Master");
        console.log(res.errors[0], "Tag Master");
      }
    });
  }

  edit(id: number) {
    this.dbops = DBOperation.update;
    this.buttonText = "Update";
    this.activeIndex = 0;
    this.objRow = this.objRows.find((x: any) => x.id === id);
    this.addForm.controls['id'].setValue(this.objRow.id);
    this.addForm.controls['name'].setValue(this.objRow.name);
  }

  delete(id: number) {
    let obj = {
      id: id
    };
    this._dataService.post(Global.BASE_API_PATH + "UserType/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        console.log("Record has been deleted", "Tag Master");
        // this._toastr.success("Record has been deleted", "Tag Master");
        this.getData();
      } else {
        //this._toastr.error(res.errors[0], "Tag Master");
        console.log(res.errors[0], "Tag Master");

      }
    });
  }

  cancelForm() {
    this.addForm.reset({
      id: 0,
      name: ''
    });
    this.dbops = DBOperation.create;
    this.buttonText = "Submit";
    this.activeIndex = 1;
  }

}



