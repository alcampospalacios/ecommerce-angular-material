import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarModule } from './component/shared/navbar/navbar.module';
import { FooterModule } from './component/shared/footer/footer.module';
import { HomeModule } from './component/home/home.module';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './shared/statate-management/product.state';

@NgModule({
  declarations: [
    AppComponent                
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    FooterModule,
    HomeModule,
    NgxsModule.forRoot([ProductsState]),
    NgxsLoggerPluginModule.forRoot()    
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
