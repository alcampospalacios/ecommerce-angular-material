export interface Orders {
    fk_user_order?: number,
    idproducts?: any,
    resume?: any,
    amount?: number,
    totalPrice?: number,
    status?: string
    date?: Date,
    
    nameReceiver: string
    lastnameReceiver: string
    ci: string
    address: string
    movilPhone: string
    anotherPhone: string
}
