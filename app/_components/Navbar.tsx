"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="flex justify-between bg-black/90 items-center  mx-4 max-md:w-full max-md:justify-between  px-6 py-4 w-full !m-0  text-white text-lg">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="w-[100px] h-[100px]"
        />
      </Link>
      <div className="hidden md:flex flex-1 items-center gap-6 ml-7">
        <Link href="/" className=" overflow-hidden h-6">
          <span className="block  hover:text-[#e04141] transition-colors  duration-300">
            Home
          </span>
        </Link>
        <Link href="/properties" className=" overflow-hidden h-6">
          <span className="block  hover:text-[#e04141] transition-colors  duration-300">
            Properties
          </span>
        </Link>
        <Link href="/contact" className=" overflow-hidden h-6">
          <span className="block  hover:text-[#e04141] transition-colors  duration-300">
            Contact
          </span>
        </Link>
        <Link href="/about" className=" overflow-hidden h-6">
          <span className="block  hover:text-[#e04141] transition-colors  duration-300">
            About
          </span>
        </Link>
      </div>

      <div className="hidden ml-14 md:flex items-center gap-4">
        {!user ? (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        ) : (
          <UserButton />
        )}
      </div>
      <button
        id="menuToggle"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden text-gray-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div
        id="mobileMenu"
        className={`fixed inset-0 bg-black/95 text-white w-full h-full  ${isMenuOpen ? "flex" : "hidden"} flex-col items-center justify-center gap-6
             backdrop-blur-md animate-fade-in transition-all duration-300 z-50`}
      >
        <button
          className="absolute top-5 right-6 text-3xl cursor-pointer text-white hover:text-indigo-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>

        <Link href="/" className=" overflow-hidden h-6">
          <span className="block text-xl  hover:text-[#e04141] transition-colors  duration-300">
            Home
          </span>
        </Link>
        <Link href="/properties" className=" overflow-hidden h-6">
          <span className="block text-xl  hover:text-[#e04141] transition-colors  duration-300">
            Properties
          </span>
        </Link>
        <Link href="/contact" className=" overflow-hidden h-6">
          <span className="block text-xl  hover:text-[#e04141] transition-colors  duration-300">
            Contact
          </span>
        </Link>
        <Link href="/about" className=" overflow-hidden h-6">
          <span className="block text-xl  hover:text-[#e04141] transition-colors  duration-300">
            About
          </span>
        </Link>

        <div className="flex flex-col gap-4 mt-8 w-[220px]">
          <SignInButton>
            <button
              className="bg-white text-black px-4 py-2 rounded-full text-base font-medium 
                       hover:bg-slate-100 hover:shadow-[0_0_25px_6px_rgba(255,255,255,0.5)] 
                       transition-all duration-300"
            >
              Get Started
            </button>
          </SignInButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
