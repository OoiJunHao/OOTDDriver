import { OTUser } from "./ot-user";
import { Region } from "./region.enum";


export class Address {
    addressId: number;
    region: Region;
    address: string;
    postalCode: string;
    isRemoved: boolean;

    user: OTUser;


    constructor(addressId: number,
        region: Region,
        address: string,
        postalCode: string,
        isRemoved: boolean,
        user: OTUser) {
        this.address = address
        this.postalCode = postalCode
        this.user = user
        this.region = region
        this.isRemoved = isRemoved;
        this.addressId = addressId;
    }

}

