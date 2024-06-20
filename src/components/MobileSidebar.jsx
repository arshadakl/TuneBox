import React from 'react';

function MobileSidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`fixed inset-0 bg-B2 text-white p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:hidden`}>
      <nav className="flex flex-col space-y-4">
        <a className="hover:bg-gray-700 p-2 rounded">Home</a>
        <a className="hover:bg-gray-700 p-2 rounded">Search</a>
        <a className="hover:bg-gray-700 p-2 rounded">Your Library</a>
      </nav>
    </div>
  );
}

export default MobileSidebar;
