import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SizeComponent } from './size/size.component';
import { TagComponent } from './tag/tag.component';
import { CategoryComponent } from './category/category.component';
import { BrandlogoComponent } from './brandlogo/brandlogo.component';
import { ColorComponent } from './color/color.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { PrimeModule } from 'src/app/prime.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SizeComponent,
    TagComponent,
    CategoryComponent,
    BrandlogoComponent,
    ColorComponent,
    UsertypeComponent
  ],
  imports: [CommonModule, MasterRoutingModule, PrimeModule, ReactiveFormsModule],
})
export class MasterModule { }
