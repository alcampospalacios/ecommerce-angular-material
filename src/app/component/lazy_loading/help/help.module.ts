import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help-routing.module';

import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    MatExpansionModule
  ]
})
export class HelpModule { }
