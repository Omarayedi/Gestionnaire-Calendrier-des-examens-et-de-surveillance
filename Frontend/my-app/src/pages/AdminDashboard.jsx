import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Header from '../components/Header';
import Cards from '../components/Cards';
import Table from '../components/Table';
import Charts from '../components/Charts';

const AdminDashboard = () => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Dashboard
            </h2>
            <Cards />
            <Table />
            <Charts />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
