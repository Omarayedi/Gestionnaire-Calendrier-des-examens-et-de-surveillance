import React, { useState } from "react";
import NotificationsMenu from "./NotificationsMenu";
import ThemeToggler from "./ThemeToggler";
import MobileSideBar from "./MobileSideBar";
import SearchInput from "./SearchInput"; // Import the SearchInput component

const Header = () => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add logic here to filter or fetch search results
  };

  return (
    <>
      {/* Header */}
      <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
          {/* Menu Button */}
          <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none"
            onClick={() => setSideMenuOpen(true)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>

          {/* Search Bar */}
          <SearchInput onSearch={handleSearch} />

          {/* Right Side */}
          <ul className="flex items-center space-x-6">
            <NotificationsMenu />
            <ThemeToggler />
          </ul>
        </div>
      </header>

      {/* Mobile Sidebar Component */}
      <MobileSideBar isOpen={isSideMenuOpen} closeSidebar={() => setSideMenuOpen(false)} />
    </>
  );
};

export default Header;
