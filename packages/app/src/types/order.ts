
import Firestore from 'firebase/firestore'
import { ShippingAddress, Currency } from './shippment';

export interface Transaction {
  orderId: string;
  salesRepId: string;
  createdAt: Firestore.FieldValue;
  updatedAt: Firestore.FieldValue;
  amount: number;
  commission: number;
  currency: Currency;
}

export interface OrderData {
  orders?: Order[];
  extUserId: string;
  extChannel: string;
}

export interface OrderLineItem {
  price?: number;
  quantity?: number;
  shippedQuantity?: number;
  name?: string;
  _id?: string;
  basePrice?: number;
  status?: string;
  hasReturnables?: boolean;
  discountPrice: string;
  description: string;
  properties: {
    colors: Array<string>;
    sizes: Array<string>;
    adendums: Array<string>;
  }
  image: string;
  galleryImages: Array<string>;

}

export interface Order {
  orderNumber?: number;
  items?: OrderLineItem[];
  balance?: number;
  createdBy?: string;
  currency?: Currency;
  createdAt?: number;
  customerNumber?: string;
  customerName?: string;
  subTotal?: number;
  isPickup?: boolean;
  totalShippedQuantity?: number;
  total?: number;
  status?: string;
  userId?: string;
  shippingCosts?: number;
  discounts?: number;
  shippingAddress?: ShippingAddress;
  dispatchedAt?: number;
  itemBaseTotal?: number;
  baseTotal?: number;
  orderType?: number;
  contactPhone?: string;
  orderTypeName?: string;
  itemTotal?: number;
  _id?: string;
  customerCompanyId?: string;
  paymentStatus?: string;
  baseSubTotal?: number;
  updatedAt?: number;
  summary?: string;
  shippingStatus?: string;
}

