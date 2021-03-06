import { string } from "yup"


export interface Employee {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Person {
  _id?: string;
  ico?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
}

export interface HardwareType {
  _id?: string;
  name: string;
  hasSerialNumber: boolean;
  isSerialNumberRequired: boolean;
  hasInventoryNumber: boolean;
  isInventoryNumberRequired: boolean;
  hasDateOfPurchase: boolean;
  isDateOfPurchaseRequired: boolean;
  isPriceRequired: boolean;
  hasPrice: boolean;
}

export interface Hardware {
  _id?: string;
  description: string;
  serialNumber: string;
  inventoryNumber: string;
  dateOfPurchase: Date;
  price: string;
  type: HardwareType;
}

export interface Invoice {
  _id?: string;
  supplier?: Person;
  supplierId: string;
  price: number;
  dateOfInvoice: Date;
  subscriber?: Person;
  subscriberId: string;
  days: number;
}
