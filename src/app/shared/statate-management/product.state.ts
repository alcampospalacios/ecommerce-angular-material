import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Products } from './../model/products';
import { AddProduct, RemoveProduct } from './product.actions';

export class ProductsStateModel {
    products: Products [];
}

@State<ProductsStateModel>({
    name: 'products',
    defaults: {
        products: []
    }
})

export class ProductsState {
    
    @Selector()
    static getProducts(state: ProductsStateModel) {
        return state.products;
    }

    @Action(AddProduct)
    add({getState, patchState}: StateContext<ProductsStateModel>, {payload}: AddProduct) {
        const state = getState();
        patchState({
            products: [...state.products, payload]
        })
    }

    @Action(RemoveProduct)
    remove({getState, patchState}: StateContext<ProductsStateModel>, {payload}: RemoveProduct) {
        patchState({
            products: getState().products.filter(t => t.idProducts.toString() != payload)
        })
    }

}