import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    // console.log(isMobileMenuOpen);
  };

  return (
    <nav className='bg-gray-100'>
      <div className='lg:max-w-7xl mx-auto px-4'>
        <div className='flex justify-between'>
          {/* Left side: Logo + Nav */}
          <div className='flex space-x-4'>
            {/* Logo */}
            <div>
              <a
                href='/'
                className='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'
              >
                {/* <svg
                  className='h-6 w-6 mr-1 text-blue-400'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                  />
                </svg> */}
                <span className='font-bold'>KidsBind</span>
              </a>
            </div>

            {/* Primary Nav */}
            <div className='hidden md:flex items-center space-x-1'>
              <a
                href='/about'
                className='py-5 px-3 text-gray-700 hover:text-gray-900'
              >
                About
              </a>
              {/* <a
                href='/blank'
                className='py-5 px-3 text-gray-700 hover:text-gray-900'
              >
                Blank
              </a>
              <a
                href='/audio'
                className='py-5 px-3 text-gray-700 hover:text-gray-900'
              >
                Audio
              </a> */}
            </div>
          </div>

          {/* Secondary Nav */}
          {/* <div className='hidden md:flex items-center space-x-1'>
            <a href='/login' className='py-5 px-3'>
              Login
            </a>
            <a
              href='/login'
              className='py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded shadow transition duration-300'
            >
              Signup
            </a>
          </div> */}

          {/* Mobile Button */}
          <div className='md:hidden flex items-center'>
            <button
              type='button'
              onClick={toggleMobileMenu}
              aria-label='Toggle Mobile Menu'
            >
              <svg
                className='w-6 h-6 text-gray-700'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <a href='/about' className='block py-2 px-4 text-sm hover:bg-gray-200'>
          About
        </a>
        {/* <a href='/blank' className='block py-2 px-4 text-sm hover:bg-gray-200'>
          Blank
        </a>
        <a href='/audio' className='block py-2 px-4 text-sm hover:bg-gray-200'>
          Audio
        </a> */}
      </div>
    </nav>
  );
};

export default Navbar;
