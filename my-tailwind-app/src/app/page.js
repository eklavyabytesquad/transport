"use client";
import React, { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#05C5FA] text-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">SS TRANSPORT</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-black text-sm font-medium">
                  Home
                </a>
                <a href="/services" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-black text-sm font-medium">
                  Services
                </a>
                <a href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-black text-sm font-medium">
                  About
                </a>
                <a href="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-black text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <a href="/login" className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100">
                Login
              </a>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-[#04b0e0] focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <a href="/" className="block pl-3 pr-4 py-2 border-l-4 border-black text-base font-medium bg-[#04b0e0]">
              Home
            </a>
            <a href="/services" className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-[#04b0e0] text-base font-medium">
              Services
            </a>
            <a href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-[#04b0e0] text-base font-medium">
              About
            </a>
            <a href="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-[#04b0e0] text-base font-medium">
              Contact
            </a>
            <a href="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium bg-white text-black">
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-6 flex flex-col justify-center sm:py-12 flex-grow">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#05C5FA] to-[#0398c3] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h1 className="text-3xl font-extrabold text-center text-[#05C5FA]">
                    Welcome to SS TRANSPORT
                  </h1>
                  <p className="text-center">
                    Your reliable transportation partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}