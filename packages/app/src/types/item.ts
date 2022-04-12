export interface CartItem {
    name: string;
    basePrice: string;
    discountPrice: string;
    description: string;
    properties: {
        colors: Array<string>;
        sizes: Array<string>;
        adendums: Array<string>;
    }
    image: string;
    galleryImages: Array<string>;
    quantity: number;
    _id: string;
    status: string;
}
