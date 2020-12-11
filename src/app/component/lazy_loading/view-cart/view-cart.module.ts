import { ViewCartComponent } from './view-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCartRoutingModule } from './view-cart-routing.module';

import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ViewCartComponent],
  imports: [
    CommonModule,
    ViewCartRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ViewCartModule { }
