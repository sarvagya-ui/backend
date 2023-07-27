import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/prime.module';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PrimeModule
  ]
})
export class ProductsModule { }
