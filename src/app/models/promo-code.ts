import { Promo } from "./promo.enum";
import { SaleTransaction } from "./sale-transaction";

export class PromoCode {
    promoCodeId: number | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    discountCode: string | undefined;
    discountRate: number | undefined;
    discountCodeTypeEnum: Promo | undefined;
    isAvailable: Boolean | undefined;
    saleTransaction: SaleTransaction[] | undefined;


    constructor(
        promoCodeId?: number,
        startDate?: Date,
        endDate?: Date,
        discountCode?: string,
        discountRate?: number,
        promoType?: Promo,
        isAvailable?: Boolean,
        saleTransaction?: SaleTransaction[]
    ) {
        this.promoCodeId = promoCodeId
        this.startDate = startDate
        this.endDate = endDate
        this.discountCode = discountCode
        this.discountRate = discountRate
        this.discountCodeTypeEnum = promoType
        this.saleTransaction = saleTransaction
        this.isAvailable = isAvailable
    }


}
