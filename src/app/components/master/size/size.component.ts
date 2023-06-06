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
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent implements OnInit {
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
    this.setTabItem();
    this.setFormState();
    this.getData();
  }

  setTabItem() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];
  }

  setFormState() {
    this.addForm = this._fb.group({
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

  onSumbit() {
    switch (this.dbops) {
      case DBOperation.create:
        this._dataService.post(Global.BASE_API_PATH + "SizeMaster/Save/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            //this._toastr.success("Data Saved Successfully !!", "Size Master");
            console.log("Data Saved Successfully !!", "Size Master");
            this.setForm();
          } else {
            //this._toastr.error(res.errors[0], "Size Master");
            console.log(res.errors[0], "Size Master");
          }
        });
        break;
      case DBOperation.update:
        this._dataService.post(Global.BASE_API_PATH + "SizeMaster/Update/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            //this._toastr.success("Data Updated Successfully !!", "Size Master");
            console.log("Data Updated Successfully !!", "Size Master");
            this.setForm();
          } else {
            //this._toastr.error(res.errors[0], "Size Master");
            console.log(res.errors[0], "Size Master");
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
    this._dataService.get(Global.BASE_API_PATH + "SizeMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
        this.totalRecords = this.objRows.length;
      } else {
        //this._toastr.error(res.errors[0], "Size Master");
        console.log(res.errors[0], "Size Master");
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
    this._dataService.post(Global.BASE_API_PATH + "SizeMaster/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        console.log("Record has been deleted", "Size Master");
        // this._toastr.success("Record has been deleted", "Size Master");
        this.getData();
      } else {
        //this._toastr.error(res.errors[0], "Size Master");
        console.log(res.errors[0], "Size Master");

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



