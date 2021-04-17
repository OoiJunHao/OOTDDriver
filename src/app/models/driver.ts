import { SaleTransaction } from "./sale-transaction";

export class Driver {
    driverId: number;
    firstname: string;
    lastName: string;
    age: number;
    username: string;
    password: string;
    profilePicture: string;
    monthlyEarnings: number;
    dailyEarnings: number;
    active: boolean;
    currentDelivery: number;
    bankAccountNumber: string;

    saleTransaction: SaleTransaction[];



    constructor(
        driverId?: number,
        firstname?: string,
        lastName?: string,
        age?: number,
        username?: string,
        password?: string,
        profilePicture?: string,
        monthlyEarnings?: number,
        dailyEarnings?: number,
        active?: boolean,
        saleTransaction?: SaleTransaction[],
        currentDelivery?: number,
        bankAccountNumber?: string
    ) {
        this.driverId = driverId
        this.firstname = firstname
        this.lastName = lastName
        this.age = age
        this.username = username
        this.password = password
        this.profilePicture = profilePicture
        this.monthlyEarnings = monthlyEarnings
        this.dailyEarnings = dailyEarnings
        this.active = active
        this.saleTransaction = saleTransaction
        this.currentDelivery = currentDelivery;
        this.bankAccountNumber = bankAccountNumber;
    }

}


