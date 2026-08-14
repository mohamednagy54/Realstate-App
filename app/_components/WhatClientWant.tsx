

import { Button } from '@/components/ui/button';
import { Building, Fence, House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function WhatClientWant() {
  return (
    <div className="relative h-[1750px]  lg:h-[750px] w-full">
      <Image
        alt="hero"
        fill
        className="w-full   h-[750px] object-cover "
        src="/whatClientWant.jpg"
      />

      <div className="absolute inset-0 bg-black/70  z-10"></div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center">
        <div className="flex items-center justify-center mt-32">
          <h1 className="text-[45px] font-bold mb-6 text-white ">
            What Are You Looking For
          </h1>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 text-white gap-6 text-center p-24">
          <div className="p-4 flex flex-col items-center h-[400px]   justify-center  bg-black/70 ">
            <House className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]" />
            <h3 className="my-3 text-[25px]">Houses</h3>
            <p>
              Explore beautiful family homes in prestigious neighborhoods,
              featuring spacious layouts, private gardens, and elegant designs.
              From charming townhouses to grand estates, each property offers
              privacy, comfort, and the perfect environment for your family to
              grow and thrive.
            </p>

            <Link href="/properties?type=house">
              <Button className="bg-[#e04141] mt-5">See All Houses</Button>
            </Link>
          </div>

          <div className="p-4 flex flex-col items-center  justify-center bg-black/70 ">
            <Building className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]" />
            <h3 className="my-3  text-[25px]">Apartments</h3>
            <p>
              Discover luxury apartments in prime locations with stunning city
              views and modern amenities. From cozy studios to spacious
              penthouses, find your perfect home with top-tier facilities
              including gyms, pools, and 24/7 security. Experience comfort and
              convenience in every detail.
            </p>

            <Link href="/properties?type=apartment">
              <Button className="bg-[#e04141] mt-5">See All Apartments</Button>
            </Link>
          </div>

          <div className="p-4 flex flex-col items-center  justify-center bg-black/70 ">
            <Fence className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]" />
            <h3 className="my-3  text-[25px]">Town House</h3>
            <p>
              Experience the perfect blend of privacy and community in our
              elegant townhouses. These multi-level homes offer spacious living
              areas, private gardens, and modern architectural designs.
              Featuring 2-4 bedrooms, contemporary kitchens, and dedicated
              parking spaces, each townhouse provides the comfort of a house
              with the convenience of shared amenities. .
            </p>
            <Link href="/properties?type=townhouse">
              <Button className="bg-[#e04141] mt-5">See All Town Houses</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
