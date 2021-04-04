import { Address } from "./address";
import { Delivery } from "./delivery.enum";
import { Driver } from "./driver";
import { OTUser } from "./ot-user";
import { PromoCode } from "./promo-code";
import { SaleTransactionLine } from "./sale-transaction-line";

export class SaleTransaction {
    saleTransactionId: number;
    totalLineItem: number;
    totalQuantity: number;
    totalAmount: number;
    transactionDateTime: Date;
    deliveryDateTime: Date;
    voidRefund: boolean;
    deliveryStatus: Delivery;

    promo: PromoCode;
    driver: Driver;
    user: OTUser;
    address: Address;
    saleTransactionLineItemEntities: SaleTransactionLine[];

    constructor(
        saleTransactionId: number,
        totalLineItem: number,
        totalQuantity: number,
        totalAmount: number,
        transactionDate: Date,
        deliveryDateTime: Date,
        voidRefund: boolean,
        deliveryStatus: Delivery,
        promo: PromoCode,
        driver: Driver,
        user: OTUser,
        address: Address,
        saleTransactionLine: SaleTransactionLine[],
    ) {
        this.saleTransactionId = saleTransactionId
        this.totalLineItem = totalLineItem
        this.totalQuantity = totalQuantity
        this.totalAmount = totalAmount
        this.transactionDateTime = transactionDate
        this.deliveryDateTime = deliveryDateTime
        this.voidRefund = voidRefund
        this.deliveryStatus = deliveryStatus
        this.promo = promo
        this.driver = driver
        this.user = user
        this.address = address
        this.saleTransactionLineItemEntities = saleTransactionLine
    }


}