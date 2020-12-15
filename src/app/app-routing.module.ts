import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },

  {
    path: 'tienda/mujer',
    loadChildren: () => import('./component/lazy_loading/store/store.module').then(m => m.StoreModule)
  },

  {
    path: 'tienda/mujer/:category',
    loadChildren: () => import('./component/lazy_loading/store/store.module').then(m => m.StoreModule)
  },

  {
    path: 'tienda/hombre/:category',
    loadChildren: () => import('./component/lazy_loading/store-man/store-man.module').then(m => m.StoreManModule)
  },  
  
  {
    path: 'details/:id',
    loadChildren: () => import('./component/lazy_loading/detail-product/detail-product.module').then(m => m.DetailProductModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./component/lazy_loading/view-cart/view-cart.module').then(m => m.ViewCartModule)
  },

  {
    path: 'checkout',
    loadChildren: () => import('./component/lazy_loading/checkout/checkout.module').then(m => m.CheckoutModule)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
