import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PrimeModule } from 'src/app/prime.module';
import { TransPipe } from './pipe/trans.pipe';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    TransPipe,
  ],

  imports: [CommonModule, AppRoutingModule, PrimeModule],
})
export class SharedModule {}
