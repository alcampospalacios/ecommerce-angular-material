import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsRoutingModule } from './us-routing.module';
import { UsComponent } from './us.component';


@NgModule({
  declarations: [UsComponent],
  imports: [
    CommonModule,
    UsRoutingModule
  ]
})
export class UsModule { }
