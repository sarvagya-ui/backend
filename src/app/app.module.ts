import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/prime.module';
import { HeaderInterceptors } from 'src/app/interceptors/header.interceptors';
import { ResponseInterceptors } from 'src/app/interceptors/response.interceptors';
import { AuthModule } from 'src/app/components/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    PrimeModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptors, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptors, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
