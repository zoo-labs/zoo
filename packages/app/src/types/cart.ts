export interface CartItem {
    name: string;
    basePrice: string;
    discountPrice: string;
    description: string;
    properties: {
        color: string;
        size: string;
        adendums: Array<string>;
    }
    image: string;
    galleryImages: Array<string>;
    quantity: number;
    id: string;
    status: string;
}
