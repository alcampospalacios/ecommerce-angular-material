import { FooterComponent } from './footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { ToastModule } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    ToastModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
