"use client"

import React from "react";

import { PropertyFilters as Filters } from "../../types";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function PropertyFilters({
  filters,
  onFiltersChange,
}: PropertyFiltersProps) {



  function handleFilterChange(filterName: keyof Filters, value: any) {
    onFiltersChange({
      ...filters,
      [filterName]: value === "" || value === "all" ? undefined : value,
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Property Type */}
        <div>
          <label
            htmlFor="propertyType"
            className="block text-sm text-gray-700 font-medium mb-1"
          >
            Property Type
          </label>
          <select
            name="propertyType"
            id=""
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.propertyType || "all"}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || "all"}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md "
          >
            <option value="all">All Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md "
            value={filters.bedrooms || "all"}
            onChange={(e) =>
              handleFilterChange(
                "bedrooms",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md "
            value={filters.bathrooms || "all"}
            onChange={(e) =>
              handleFilterChange(
                "bathrooms",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            placeholder="Min Price"
            className="w-full p-2 border border-gray-300 rounded-md "
            value={filters.minPrice || ""}
            onChange={(e) =>
              handleFilterChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            placeholder="Max Price"
            className="w-full p-2 border border-gray-300 rounded-md "
            value={filters.maxPrice || ""}
            onChange={(e) =>
              handleFilterChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
