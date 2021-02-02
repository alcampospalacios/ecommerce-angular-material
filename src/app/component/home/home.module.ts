import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOverview, HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'ng-starrating';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [HomeComponent, DialogOverview],
  imports: [
    CommonModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule,   
    RatingModule,
    MatDividerModule,
    LazyLoadImageModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class HomeModule { }
