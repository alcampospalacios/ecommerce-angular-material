import { DialogLogin, DialogSignup, NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import {ScrollingModule} from '@angular/cdk/scrolling';




import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastModule } from 'ng-uikit-pro-standard';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent, DialogLogin, DialogSignup],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    HttpClientModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,   
    MatSidenavModule,
    ScrollingModule,
    MDBBootstrapModule.forRoot(),
    ToastModule.forRoot(),
  ],
  providers: [],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
