import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { useInventoryStore } from '../store/useInventoryStore';
import { formatCurrency } from '../utils/helpers';

export const Dashboard: React.FC = () => {
  const { products, transactions, getLowStockProducts } = useInventoryStore();
  
  const totalValue = products.reduce((sum, product) => {
    return sum + product.price * product.stock;
  }, 0);

  const lowStockProducts = getLowStockProducts();
  
  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Valor Total del Inventario</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Productos en Stock</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Alertas de Stock Bajo</p>
              <p className="text-2xl font-bold">{lowStockProducts.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Productos con Stock Bajo</h2>
          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Actual: {product.stock} {product.unit === 'kg' ? 'kg' : 'unidades'}
                  </p>
                </div>
                <span className="text-red-500 text-sm">
                  Debajo de {product.minStock} {product.unit === 'kg' ? 'kg' : 'unidades'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Transacciones Recientes</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => {
              const product = products.find((p) => p.id === transaction.productId);
              return (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.quantity} {product?.unit === 'kg' ? 'kg' : 'unidades'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {transaction.type === 'in' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-2" />
                    )}
                    <span>{formatCurrency(transaction.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};