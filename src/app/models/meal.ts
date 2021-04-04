export class Meal {
    mealId: number | undefined;
    price: number | undefined;
    description: string | undefined;
    name: string | undefined;
    image: string | undefined;

    constructor(
        mealId?: number,
        price?: number,
        description?: string,
        name?: string,
        image?: string,

    ) {
        this.mealId = mealId
        this.price = price
        this.description = description
        this.name = name
        this.image = image
    }


}

