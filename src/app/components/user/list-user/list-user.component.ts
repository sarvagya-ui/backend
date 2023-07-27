import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  objRows: any;
  totalRecords: number = 0;

  constructor(private _dataService: DataService, private navRoute: Router) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this._dataService.get(Global.BASE_API_PATH + "UserMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
        this.totalRecords = this.objRows.length;
      } else {
        //this._toastr.error(res.errors[0], "User Master");
        console.log(res.errors[0], "User Master");
      }
    });
  }


  edit(id: number) {
    this.navRoute.navigate(['/users/create-user'], { queryParams: { userId: id } })
  }

  //function to hide Id from URL
  // edit(id: number) {
  //   this.navRoute.navigate(['/users/create-user'], { state: { userId: id } });
  // }


  delete(id: number) {
    let obj = {
      id: id
    };

    this._dataService.post(Global.BASE_API_PATH + "UserMaster/Delete/", obj).subscribe(res => {
      if (res.isSuccess) {
        // this._toastr.success("Record has been deleted", "User Master");
        this.getData();
      } else {
        //this._toastr.error(res.errors[0], "User Master");
        console.log(res.errors[0], "User Master");
      }
    });
  }

  navCreateUser() {
    this.navRoute.navigate(['users/create-user']);
  }


}


