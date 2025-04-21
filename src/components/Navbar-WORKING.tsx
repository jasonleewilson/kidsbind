import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    console.log("Menu is now:", !isOpen);
  };

  return (
    <nav className='bg-gray-100 border-b border-gray-300'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='text-xl font-bold text-blue-600'>Mana Potion</div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          aria-label='Toggle menu'
          type='button'
          className='text-gray-800 focus:outline-none'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            {isOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='px-4 pb-4'>
          <a href='#' className='block py-2 text-gray-700 hover:text-blue-600'>
            Home
          </a>
          <a href='#' className='block py-2 text-gray-700 hover:text-blue-600'>
            About
          </a>
          <a href='#' className='block py-2 text-gray-700 hover:text-blue-600'>
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
