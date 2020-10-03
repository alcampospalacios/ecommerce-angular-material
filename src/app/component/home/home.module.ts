import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'ng-starrating';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule,   
    RatingModule,
    MatDividerModule
  ]
})
export class HomeModule { }
