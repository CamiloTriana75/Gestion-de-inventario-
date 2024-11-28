import React from 'react';
import { Plus } from 'lucide-react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { SupplierModal } from './SupplierModal';
import { SupplierCard } from './SupplierCard';

export const SupplierList: React.FC = () => {
  const { suppliers } = useInventoryStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingSupplier, setEditingSupplier] = React.useState(null);

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Supplier
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {isModalOpen && (
        <SupplierModal
          supplier={editingSupplier}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};