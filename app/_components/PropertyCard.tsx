import { Property } from "@/types";
import { Bath, Bed, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface propertyCardPropsType {
  property: Property;
}

export default function PropertyCard({ property }: propertyCardPropsType) {
  const {
    images,
    status,
    featured,
    _id,
    price,
    title,
    city,
    bedrooms,
    bathrooms,
    area,
    state,
    propertyType,
  } = property;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "for-sale":
        return "bg-green-100 text-green-800";

        break;
      case "for-rent":
        return "bg-blue-100 text-blue-800";
      case "sold":
        return "bg-gray-100 text-gray-800";
      case "rented":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "for-sale":
        return "For Sale";
      case "for-rent":
        return "For Rent";
      case "sold":
        return "Sold";
      case "rented":
        return "Rented";
      default:
        return status;
    }
  };

  return (
    <Link href={`/properties/${_id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* image */}
        <div className="relative w-full h-64">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt="property image"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {/* status badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`bg-[ #e04141] p-2 rounded-full ${getStatusColor(status)}`}
            >
              {getStatusText(status)}
            </span>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-500 p-2 rounded-full text-black">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* content */}
        <div className="p-4">
          {/* price */}
          <div className="mb-2">
            <span className="text-2xl text-[#e04141] font-bold">
              {price.toLocaleString("en-US")} $
            </span>
            {status === "for-rent" && (
              <span className="text-gray-600">/month</span>
            )}
          </div>

          {/* title & descreption */}

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* location */}
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {city}, {state}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex  items-center gap-6 text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{area} m²</span>
            </div>
          </div>

          {/* property type */}
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
              {propertyType.replace("-", "")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
