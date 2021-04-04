import {Meal} from "./meal"

export class SaleTransactionLine {

    meal: Meal;
    quantity: number;
    saleTransactionLineItemId: number;

    constructor(saleTransactionLineItemId: number, quantity: number, meal: Meal) {
        this.meal = meal;
        this.quantity = quantity;
        this.saleTransactionLineItemId = saleTransactionLineItemId;
    }


}
