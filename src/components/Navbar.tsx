import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    // console.log(isMobileMenuOpen);
  };

  return (
    <nav>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between'>
          {/* Left side: Logo + Nav */}
          <div className='flex space-x-4'>
            {/* Logo */}
            <div>
              <a
                href='/'
                className='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'
              >
                <span className='bold'>Kids</span><span className='font-extralight'>Bind</span>
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
        <a href='/about' className='block text-right py-2 px-4 text-sm hover:bg-gray-200'>
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
