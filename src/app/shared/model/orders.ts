export interface Orders {
    idorders: number,
    idProducts: string,
    amount: number,
    totalPrice: number,
    date: Date,
    fk_user: number
}
