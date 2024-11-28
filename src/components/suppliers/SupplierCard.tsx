import React from 'react';
import { Edit2, Mail, Phone, User } from 'lucide-react';
import { Supplier } from '../../types/inventory';

interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({
  supplier,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="w-5 h-5 mr-2 text-gray-500" />
            {supplier.name}
          </h3>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {supplier.email}
            </p>
            <p className="text-gray-600 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              {supplier.phone}
            </p>
          </div>
          <p className="mt-4 text-gray-600">{supplier.contact}</p>
        </div>
        <button
          onClick={() => onEdit(supplier)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};