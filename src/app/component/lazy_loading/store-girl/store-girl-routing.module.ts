import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreGirlComponent } from './store-girl.component';

const routes: Routes = [
  {
    path: '', component: StoreGirlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreGirlRoutingModule { }
