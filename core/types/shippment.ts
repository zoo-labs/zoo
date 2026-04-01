export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface ShippingAddress {
    isBillingDefault?: boolean;
    phone?: string;
    address1?: string;
    lga?: string;
    _id?: string;
    isShippingDefault?: boolean;
    company?: string;
    state?: string;
    coordinates?: Coordinates;
    fullName?: string;
}

export interface Currency {
    iso: string;
    symbol: string;
}

export interface Shipment {
    shippingAddress: ShippingAddress;
    currency: Currency;
    orderNumber: number;
    issuedAt: Date;
    customerName: string;
    contactPhone: string;
    total: number;
    shippingStatus: string;
    dispatchAssigneeId: string;
    g: number;
    globalOrderNumber: string;
    salesAssigneeNumber: string;
    salesAssigneeName: string;
    _groupId: string;
}

