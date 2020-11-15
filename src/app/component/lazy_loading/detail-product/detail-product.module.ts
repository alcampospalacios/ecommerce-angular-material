import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailProductComponent } from './detail-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProductRoutingModule } from './detail-product-routing.module';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';

import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [DetailProductComponent],
  imports: [
    CommonModule,
    DetailProductRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    LazyLoadImageModule
  ]
})
export class DetailProductModule { }
