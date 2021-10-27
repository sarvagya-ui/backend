import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FeathericonComponent } from './components/feathericon/feathericon.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';



@NgModule({
  declarations: [BreadcrumbComponent, FeathericonComponent, FooterComponent, HeaderComponent, SidebarComponent, ContentLayoutComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
