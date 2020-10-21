import { PaginatePipe } from './../../../shared/pipes/paginate.pipe';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';

import {MatSidenavModule} from '@angular/material/sidenav';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { RatingModule } from 'ng-starrating';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CustomMatPaginatorIntl } from './paginator-es';




@NgModule({
  declarations: [StoreComponent, PaginatePipe],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatSidenavModule,    
    MatExpansionModule,
    MatMenuModule,
    ScrollingModule,
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    RatingModule,
    MatPaginatorModule,
    LazyLoadImageModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}],
  exports: [MatSidenavModule]
})
export class StoreModule { }
