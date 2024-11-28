import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Product } from '../types/inventory';
import { formatCurrency } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const isLowStock = product.stock <= product.minStock;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative h-48 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Stock Bajo
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <div className="mt-2 space-y-1">
        <p className="text-gray-600">
          Precio: {formatCurrency(product.price)}/{product.unit === 'kg' ? 'kg' : 'unidad'}
        </p>
        <p className="text-gray-600">
          Stock: {product.stock} {product.unit === 'kg' ? 'kg' : 'unidades'}
        </p>
        <p className="text-gray-600">Categoría: {product.category === 'fruit' ? 'Fruta' : 'Verdura'}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          title="Editar"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          title="Eliminar"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};