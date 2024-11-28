import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { InventoryList } from './components/inventory/InventoryList';
import { TransactionList } from './components/transactions/TransactionList';
import { SupplierList } from './components/suppliers/SupplierList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'inventory' && <InventoryList />}
        {activeTab === 'transactions' && <TransactionList />}
        {activeTab === 'suppliers' && <SupplierList />}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;