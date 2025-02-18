import React, { useState, useRef, useEffect } from "react";

const NotificationsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Notification button */}
      <button
        className="relative align-middle rounded-md focus:outline-none"
        onClick={toggleMenu}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
        {/* Notification badge */}
        <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 border-2 border-white rounded-full"></span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 bg-white border border-gray-100 rounded-md shadow-md">
          <li className="flex">
            <a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100" href="#">
              <span>Messages</span>
              <span className="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-full">13</span>
            </a>
          </li>
          <li className="flex">
            <a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100" href="#">
              <span>Sales</span>
              <span className="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-full">2</span>
            </a>
          </li>
          <li className="flex">
            <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold rounded-md hover:bg-gray-100" href="#">
              <span>Alerts</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NotificationsMenu;
