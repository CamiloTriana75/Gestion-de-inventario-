import React from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TransactionModal } from './TransactionModal';

export const TransactionList: React.FC = () => {
  const { transactions, products } = useInventoryStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          New Transaction
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTransactions.map((transaction) => {
              const product = products.find((p) => p.id === transaction.productId);
              return (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="flex items-center">
                      {transaction.type === 'in' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      {transaction.type === 'in' ? 'Stock In' : 'Stock Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.quantity} {product?.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(transaction.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};