import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandlogoComponent } from 'src/app/components/master/brandlogo/brandlogo.component';
import { CategoryComponent } from 'src/app/components/master/category/category.component';
import { ColorComponent } from 'src/app/components/master/color/color.component';
import { SizeComponent } from 'src/app/components/master/size/size.component';
import { TagComponent } from 'src/app/components/master/tag/tag.component';
import { UsertypeComponent } from 'src/app/components/master/usertype/usertype.component';

//routes are given inside childer , so that in future guard will be applied at one place
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'brandlogo', component: BrandlogoComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'tag', component: TagComponent },
      { path: 'size', component: SizeComponent },
      { path: 'color', component: ColorComponent },
      { path: 'usertype', component: UsertypeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
