"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import PropertyFilters from "../_components/PropertyFilters";
import { PropertyFilters as Filters } from "@/types";
import PropertyCard from "../_components/PropertyCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    propertyType: searchParams.get("type") || undefined,
    status: searchParams.get("status") || undefined,
    bedrooms: searchParams.get("bedrooms")
      ? Number(searchParams.get("bedrooms"))
      : undefined,
    bathrooms: searchParams.get("bathrooms")
      ? Number(searchParams.get("bathrooms"))
      : undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
  });
  const properties = useQuery(api.properties.getProperties, filters);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([Key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(Key, String(value));
      }
    });

    const query = params.toString();
    router.replace(`/properties${query ? `?${query}` : ""}`);
  }, [filters, router]);

  const { userId } = useAuth();

  const handleClick = () => {
    if (!userId) {
      router.push("/sign-in");
    } else {
      router.push("/properties/new");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                All Properties
              </h1>
              {properties && (
                <p className="text-gray-600 mt-1">
                  {properties.length} properties found
                </p>
              )}
            </div>

            <Button
              onClick={handleClick}
              className="bg-[#e04141] hover:bg-[#c73636] flex items-center gap-2"
            >
              <ArrowBigRight className="w-4 h-4" />
              Add Property
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - two column */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-">
                Filter Properties
              </h3>

              <PropertyFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* loading */}
            {properties === undefined ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white animate-pulse rounded-xl h-80 shadow-sm border"
                  ></div>
                ))}
              </div>
            ) : properties.length === 0 ? (
              <>
                <div className="text-center text-gray-500 py-10">
                  No properties found.
                </div>
                {/* Back to All Properties Link */}
                {Object.values(filters).some(
                  (value) =>
                    value !== undefined && value !== "" && value !== "all"
                ) && (
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilters({});
                        router.replace("/properties");
                      }}
                      size="lg"
                    >
                      View All Properties
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Results Summary */}
                <div className="flex justify-between items-center mb-5">
                  <div className="text-sm text-gray-600">
                    Showing {properties.length}{" "}
                    {properties.length === 1 ? "property" : "properties"}{" "}
                  </div>

                  {/* sort options */}
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                    <span>Sort by:</span>
                    <select
                      name=""
                      id=""
                      value={filters.sortOption}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          sortOption: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties?.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Back to All Properties Link */}
                {Object.values(filters).some(
                  (value) =>
                    value !== undefined && value !== "" && value !== "all"
                ) && (
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilters({});
                        router.replace("/properties");
                      }}
                      size="lg"
                    >
                      View All Properties
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesPageContent />
    </Suspense>
  );
}
