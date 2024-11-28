import React from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { Supplier } from '../../types/inventory';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface SupplierModalProps {
  supplier?: Supplier | null;
  onClose: () => void;
}

export const SupplierModal: React.FC<SupplierModalProps> = ({
  supplier,
  onClose,
}) => {
  const { addSupplier, updateSupplier } = useInventoryStore();
  const [formData, setFormData] = React.useState({
    name: supplier?.name || '',
    contact: supplier?.contact || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (supplier) {
        updateSupplier(supplier.id, formData);
        toast.success('Supplier updated successfully');
      } else {
        addSupplier(formData);
        toast.success('Supplier added successfully');
      }
      onClose();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {supplier ? 'Edit Supplier' : 'Add Supplier'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Person
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {supplier ? 'Update' : 'Add'} Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};