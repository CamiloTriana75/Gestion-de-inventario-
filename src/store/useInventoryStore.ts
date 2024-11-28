import { create } from 'zustand';
import { Product, Transaction, Supplier } from '../types/inventory';
import { generateId } from '../utils/helpers';

interface InventoryStore {
  products: Product[];
  transactions: Transaction[];
  suppliers: Supplier[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  getLowStockProducts: () => Product[];
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  products: [],
  transactions: [],
  suppliers: [],

  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, { ...product, id: generateId() }],
    }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      ),
    }));
  },

  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },

  addTransaction: (transaction) => {
    const newTransaction = { ...transaction, id: generateId() };
    set((state) => {
      const product = state.products.find((p) => p.id === transaction.productId);
      if (!product) return state;

      const newStock = transaction.type === 'in' 
        ? product.stock + transaction.quantity
        : product.stock - transaction.quantity;

      return {
        transactions: [...state.transactions, newTransaction],
        products: state.products.map((p) =>
          p.id === transaction.productId ? { ...p, stock: newStock } : p
        ),
      };
    });
  },

  addSupplier: (supplier) => {
    set((state) => ({
      suppliers: [...state.suppliers, { ...supplier, id: generateId() }],
    }));
  },

  updateSupplier: (id, updates) => {
    set((state) => ({
      suppliers: state.suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updates } : supplier
      ),
    }));
  },

  getLowStockProducts: () => {
    return get().products.filter((product) => product.stock <= product.minStock);
  },
}));