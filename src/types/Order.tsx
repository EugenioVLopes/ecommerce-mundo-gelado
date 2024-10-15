export interface Order {
  _id: string;
  user: any;
  items: any[];
  total: number;
  status: string;
  address?: any;
  paymentMethod?: string;
  change?: number;
  createdAt: string;
}
