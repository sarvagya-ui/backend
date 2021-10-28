import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FeathericonComponent } from './components/feathericon/feathericon.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BreadcrumbComponent,
    FeathericonComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FeathericonComponent /* We have created feature module then created one component , to use this component you need to export it */
  ]
})
export class SharedModule { }
