import React from 'react';
import { Plus } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { ProductCard } from '../ProductCard';
import { ProductModal } from './ProductModal';

export const InventoryList: React.FC = () => {
  const { products } = useInventoryStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={useInventoryStore.getState().removeProduct}
          />
        ))}
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};