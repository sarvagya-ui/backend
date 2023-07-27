import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productId!: number;

  constructor(private route: ActivatedRoute, private _dataService: DataService,
    private _fb: FormBuilder, private navRouter: Router) {
  }

  ngOnInit() {
    this.getProductIdFromURL();
  }
  getProductIdFromURL() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['product'];
      if (this.productId && this.productId != null && this.productId > 0) {
        debugger;
      }
    });
  }

}
