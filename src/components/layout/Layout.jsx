import React from 'react';

const Layout = ({ 
  children, 
  sidebar = null, 
  header = null, 
  className = '',
  sidebarOpen = false,
  onToggleSidebar = null,
  ...props 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`} {...props}>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 h-full w-80 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {sidebar}
      </div>
      
      {/* Main Content */}
      <div className="lg:ml-80 flex flex-col min-h-screen">
        {/* Header */}
        {header}
        
        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
