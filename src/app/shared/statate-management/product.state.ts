import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Products } from './../model/products';
import { AddProduct, RemoveAllProduct, RemoveProduct, UpdateProduct } from './product.actions';
import { tap } from 'rxjs/operators';

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
        });
    }

    @Action(RemoveProduct)
    remove({getState, patchState}: StateContext<ProductsStateModel>, {payload}: RemoveProduct) {
        patchState({
            products: getState().products.filter(t => t.id != payload)
        });
    }

    @Action(RemoveAllProduct)
    removeAll({getState, patchState}: StateContext<ProductsStateModel>) {
        patchState({
            products: []
        });
    }

    @Action(UpdateProduct)
    update(ctx: StateContext<ProductsStateModel>, {payload}: UpdateProduct) {
        ctx.setState(
            patch({
                products: updateItem<Products>(p => p.id === payload.id, payload.newProduct)
            })
        );
    }

}