import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-brandlogo',
  templateUrl: './brandlogo.component.html',
  styleUrls: ['./brandlogo.component.scss']
})
export class BrandlogoComponent {
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
  editImagePath = "assets/images/noimage.png";
  @ViewChild('file') elfile!: ElementRef;
  fileToUpload!: File | null;

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

  upload(files: any) {
    if (files.Length === 0) {
      return;
    }
    let type = files[0].type;

    //using regex pattern to check if the file is image or not
    if (type.match(/image\/*/) == null) {
      //this._toastr.error("Only Images are supported !!", "Brand Logo");
      console.log("Only Images are supported !!", "Brand Logo");
      this.elfile.nativeElement.value = "";
    }
    this.fileToUpload = files[0];
    //read image and displaying it on screen
    let reader: any = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.editImagePath = reader.result.toString();
    }
  }

  onSubmit() {
    if (this.dbops === DBOperation.create && !this.fileToUpload) {
      //this._toastr.error("Please upload image !!", "Brand Logo");
      console.log("Please upload image !!", "Brand Logo");
      return;
    }
    let formData = new FormData();
    formData.append("Id", this.addForm.controls['id'].value);
    formData.append("Name", this.addForm.controls['name'].value);
    if (this.fileToUpload) {
      formData.append("Image", this.fileToUpload, this.fileToUpload.name);
    }
    switch (this.dbops) {
      case DBOperation.create:
        this._dataService.postImage(Global.BASE_API_PATH + "BrandLogo/Save/", formData).subscribe(res => {
          if (res.isSuccess) {
            console.log("Data Saved Successfully !!", "Brand Logo");
            //this._toastr.success("Data Saved Successfully !!", "Brand Logo");
            this.setForm();
          } else {
            console.log(res.errors[0], "Brand Logo");
            //this._toastr.error(res.errors[0], "Brand Logo");
          }
        });
        break;
      case DBOperation.update:
        this._dataService.postImage(Global.BASE_API_PATH + "BrandLogo/Update/", formData).subscribe(res => {
          if (res.isSuccess) {
            // this._toastr.success("Data Updated Successfully !!", "Brand Logo");
            console.log("Data Updated Successfully !!", "Brand Logo");
            this.setForm();
          } else {
            // this._toastr.error(res.errors[0], "Brand Logo");
            console.log(res.errors[0], "Brand Logo");
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
    this.editImagePath = "assets/images/noimage.png";
    this.fileToUpload = null;
    this.getData();

  }

  getData() {
    this._dataService.get(Global.BASE_API_PATH + "BrandLogo/GetAll").subscribe(res => {
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
    this.editImagePath = this.objRow.imagePath;
  }

  delete(id: number) {
    let obj = {
      id: id
    };
    this._dataService.post(Global.BASE_API_PATH + "BrandLogo/Delete/", obj).subscribe(res => {
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
    this.editImagePath = "assets/images/noimage.png";
    this.fileToUpload = null;
  }

}



