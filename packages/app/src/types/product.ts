export interface Product {
    name: string;
    basePrice: string;
    discountPrice: string;
    description: string;
    shortDescription: string;
    properties: {
        colors: Array<string>;
        sizes: Array<string>;
        adendums: Array<string>;
    }
    image: string;
    galleryImages: Array<string>;
    quantity: number;
    id: string;
    status: string;
    createdAt: string;
}
