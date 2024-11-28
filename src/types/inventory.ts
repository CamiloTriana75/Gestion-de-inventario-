export interface Product {
  id: string;
  name: string;
  category: 'fruit' | 'vegetable';
  price: number;
  stock: number;
  unit: 'kg' | 'piece';
  image: string;
  minStock: number;
  supplier: string;
}

export interface Transaction {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: Date;
  price: number;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
}