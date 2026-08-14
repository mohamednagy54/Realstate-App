

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

export default function ConnectingPeople() {
  return (
    <div className="p-24 items-center grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Image
        className="rounded-3xl w-full h-[450px] object-cover"
        width={800}
        height={800}
        alt="image"
        src="/house.jpg"
      />

      <div>
        <h1 className="text-[35px] text-[#e04141]">
          Connecting people with perfect homes is our passion.
        </h1>
        <p className="text-gray-600 mt-3">
          With a genuine passion for helping people find their dream homes, we
          are dedicated to connecting buyers and sellers in the real estate
          market. Trust us to make your home buying or selling experience
          seamless and satisfying.
        </p>

        <Button className="mt-5">Read More</Button>
      </div>
    </div>
  );
}
