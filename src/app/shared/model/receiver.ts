export interface Receiver {
    idreceiver: number;
    name: string;
    lastname: string;    
    ci: string,
    address: string,  
    movilPhone: string;
    anotherPhone?: string;
    fk_user: number;
}