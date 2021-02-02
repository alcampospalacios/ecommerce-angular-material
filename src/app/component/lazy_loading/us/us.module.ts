import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsRoutingModule } from './us-routing.module';
import { UsComponent } from './us.component';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [UsComponent],
  imports: [
    CommonModule,
    UsRoutingModule,
    MatButtonModule
  ]
})
export class UsModule { }
