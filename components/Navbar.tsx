import React, { useCallback, useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Link from 'next/link';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        
        <p className=' text-slate-50 font-serif h-4 lg:h-7 text-[30px]'> AI-DUBGENIUS</p>
        <div className="flex-row hidden ml-8 gap-7 lg:flex">
          <a href='#home'>
          <p className='text-white'>Home</p>
          </a> 
          <p className='text-white'> Series</p>
          <p className='text-white'>Films</p>
          <p className='text-white'>New & Popular</p>
          <a href='#mylist'>
          <p className='text-white'>My List</p>
          </a>
          {/* <NavbarItem label="Browse by Languages" /> */}
        </div>
        <div onClick={toggleMobileMenu} className="relative flex flex-row items-center gap-2 ml-8 cursor-pointer lg:hidden">
          <p className="text-sm text-white">Browse</p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row items-center ml-auto gap-7">
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-300">
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <div className="text-gray-200 transition cursor-pointer hover:text-gray-300">
            <BellIcon className="w-6" />
          </div>
          <div onClick={toggleAccountMenu} className="relative flex flex-row items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 overflow-hidden rounded-md lg:w-10 lg:h-10">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
