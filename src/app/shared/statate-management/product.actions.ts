import { Products } from './../model/products';

export class AddProduct {
    static readonly type = '[PRODUCT] Add';

    constructor(public payload: Products) {}
}

export class RemoveProduct {
    static readonly type = '[PRODUCT] Remove';

    constructor(public payload: string) {}
}