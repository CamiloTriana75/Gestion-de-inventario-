import React from 'react';
import { LayoutGrid, Package, History, Users, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Panel Principal' },
    { id: 'inventory', icon: Package, label: 'Inventario' },
    { id: 'transactions', icon: History, label: 'Transacciones' },
    { id: 'suppliers', icon: Users, label: 'Proveedores' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-600">Fresh Stock</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 ${
                activeTab === item.id ? 'bg-green-50 text-green-600' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};