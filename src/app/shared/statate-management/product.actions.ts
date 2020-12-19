import { Products } from './../model/products';

export class AddProduct {
    static readonly type = '[PRODUCT] Add';
    constructor(public payload: Products) {}
}

export class RemoveProduct {
    static readonly type = '[PRODUCT] Remove';
    constructor(public payload: number) {}
}

export class RemoveAllProduct {
    static readonly type = '[PRODUCT] RemoveAll';
    constructor() {}
}

export class UpdateProduct {
    static readonly type = '[PRODUCT] Update';
    constructor(public payload: {idProduct: number; newProduct: Products}) {}
  }