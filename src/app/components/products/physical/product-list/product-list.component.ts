import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Global } from 'src/app/shared/services/global';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  objRows: any;
  totalRecords!: number;

  constructor(private _dataService: DataService,
    private navRoute: Router
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this._dataService.get(Global.BASE_API_PATH + "ProductMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
        this.totalRecords = this.objRows.length;
      } else {
        //this._toastr.error(res.errors[0], "Size Master");
        console.log(res.errors[0], "ProductMaster");
      }
    });
  }

  edit(id: number) {
    this.navRoute.navigate(['/products/physical/add-product'], { queryParams: { product: id } })
  }
  delete(x: any) { }

}
