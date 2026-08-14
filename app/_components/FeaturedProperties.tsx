"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

export default function FeaturedProperties() {
  const featuredProperties = useQuery(api.properties.getFeaturedProperties);

  return (
    <div className="p-24 mb-8 space-y-12">
      <h2>Featured Properties</h2>

      {featuredProperties === undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg h-80"
            ></div>
          ))}
        </div>
      ) : featuredProperties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            No featured properties yet
          </h3>

          <Button>Add your Property</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties?.map((property) => (
            <PropertyCard property={property} key={property._id} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-end">
        <Link href={"/properties"}>
          <Button>
            See all <ArrowBigRight />
          </Button>
        </Link>
      </div>

      {/* stats section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
        <div className="flex flex-col items-center justify-center shadow-lg h-[250px] bg-[#f9e0e0]">
          <h3 className="text-4xl font-bold text-[#e04141]">500+</h3>
          <p className="text-gray-600">Properties Listed</p>
        </div>

        <div className="flex flex-col items-center justify-center shadow-lg h-[250px] bg-green-100">
          <h3 className="text-4xl font-bold text-green-700">200+</h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>

        <div className="flex flex-col items-center justify-center shadow-lg h-[250px] bg-amber-100">
          <h3 className="text-4xl font-bold text-amber-500">100+</h3>
          <p className="text-gray-600">Agents</p>
        </div>

        <div className="flex flex-col items-center justify-center shadow-lg h-[250px] bg-blue-100">
          <h3 className="text-4xl font-bold text-blue-700">50+</h3>
          <p className="text-gray-600">Cities Covered</p>
        </div>
      </div>
    </div>
  );
}
