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
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  items!: MenuItem[];
  activeIndex: number = 0;
  tagForm!: FormGroup;
  objRows: any;
  cols!: any[];
  totalRecords!: number
  buttonText: string = "Submit";
  objRow: any;
  dbops !: DBOperation;
  formErrors: any = {
    name: ''
  };

  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Name cannot be leass than 1 chars long',
      maxlength: 'Name cannot be more than 10 chars long',
      validOnlyCharFiled: 'Name must be contains only latters',
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
    this.tagForm = this._fb.group({
      id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        OnlyCharFiledValidator.validOnlyCharFiled,
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])]

    });

    //note this will not work for required error , you need to handle that in Html only
    this.tagForm.valueChanges.subscribe(() => {
      this.onValueChanged();
    });
  }

  onValueChanged() {
    if (!this.tagForm) {
      return;
    }

    for (const filed of Object.keys(this.formErrors)) {
      //filed == 'name'
      this.formErrors[filed] = "";
      const control = this.tagForm.get(filed);
      if (control && control.dirty && !control.valid) {
        //getting all errors for name
        const message = this.validationMessages[filed];
        //getting field name  with error, i.e. name
        const control: any = this.tagForm.get(filed);
        for (const key of Object.keys(control.errors)) {
          if (key !== 'required') {
            this.formErrors[filed] += message[key] + ' ';
          }
        }
      }
    }
  }

  get f() {
    return this.tagForm.controls;
  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        this._dataService.post(Global.BASE_API_PATH + "TagMaster/Save/", this.tagForm.value).subscribe(res => {
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
        this._dataService.post(Global.BASE_API_PATH + "TagMaster/Update/", this.tagForm.value).subscribe(res => {
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
    this.tagForm.reset({
      id: 0,
      name: ''
    });

    this.dbops = DBOperation.create;
    this.buttonText = "Submit";
    this.activeIndex = 1;
    this.getData();
  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "TagMaster/GetAll").subscribe(res => {
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
    this.tagForm.controls['id'].setValue(this.objRow.id);
    this.tagForm.controls['name'].setValue(this.objRow.name);
  }

  delete(id: number) {
    let obj = {
      id: id
    };
    this._dataService.post(Global.BASE_API_PATH + "TagMaster/Delete/", obj).subscribe(res => {
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
    this.tagForm.reset({
      id: 0,
      name: ''
    });
    this.dbops = DBOperation.create;
    this.buttonText = "Submit";
    this.activeIndex = 1;
  }

}



