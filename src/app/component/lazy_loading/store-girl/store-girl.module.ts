import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreGirlRoutingModule } from './store-girl-routing.module';
import { DialogGirlOverview, StoreGirlComponent } from './store-girl.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {RatingModule} from 'ng-starrating';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [StoreGirlComponent, DialogGirlOverview],
  imports: [
    CommonModule,
    StoreGirlRoutingModule,
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
    MatDialogModule,
    MatFormFieldModule,    
    LazyLoadImageModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatInputModule,
    SharedModule
  ],
  providers: []  
})
export class StoreGirlModule { }
