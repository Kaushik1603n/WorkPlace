import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../components/NavBar/NavigationBar';
import FreelancerSidebar from '../../components/freelancer/SideBar';


const FreelancerLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavigationBar />

      <div className="flex flex-1 overflow-hidden">
        <FreelancerSidebar />

        {/* Main content will be injected here */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FreelancerLayout;
