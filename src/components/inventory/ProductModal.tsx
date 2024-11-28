import React from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { Product } from '../../types/inventory';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useInventoryStore();
  const [formData, setFormData] = React.useState({
    name: product?.name || '',
    category: product?.category || 'fruit',
    price: product?.price || 0,
    stock: product?.stock || 0,
    unit: product?.unit || 'kg',
    image: product?.image || '',
    minStock: product?.minStock || 0,
    supplier: product?.supplier || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        updateProduct(product.id, formData);
        toast.success('Producto actualizado exitosamente');
      } else {
        addProduct(formData);
        toast.success('Producto agregado exitosamente');
      }
      onClose();
    } catch (error) {
      toast.error('Ocurrió un error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {product ? 'Editar Producto' : 'Agregar Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'fruit' | 'vegetable' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="fruit">Fruta</option>
                <option value="vegetable">Verdura</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unidad</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value as 'kg' | 'piece' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="kg">Kilogramo</option>
                <option value="piece">Unidad</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock Mínimo
            </label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL de Imagen
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {product ? 'Actualizar' : 'Agregar'} Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};