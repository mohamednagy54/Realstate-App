"use client";

import ScheduleViewing from "@/app/_components/ScheduleViewing";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { DialogContent } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "convex/react";
import { Bath, Bed, Calendar, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page({ params }: { params: any }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();
  const { userId } = useAuth();

  const property = useQuery(api.properties.getSingleProperty, {
    id: params.id as any,
  });

  const deleteProperty = useMutation(api.properties.deleteProperty);

  async function handleDelete() {
    try {
      await deleteProperty({ id: params.id });
      router.push("/");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    }
  }

  if (!property) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h3 className="font-bold text-2xl text-red-600">Property Not Found</h3>
        <Button className="ml-4" onClick={() => router.push("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {userId && (
        <div className="flex justify-end items-center gap-4 mt-10">
          <Link href={`/properties/${property?._id}/edit`}>
            <Button>Edit</Button>
          </Link>

          <Button onClick={handleDelete} className="bg-red-600">
            Delete
          </Button>
        </div>
      )}

      {/* Image Gallery */}
      <div className="mb-8">
        {property?.images && property.images.length > 0 ? (
          <div className="space-y-4">
            {/* main image */}
            <div className="relative w-full h-[550px]  mt-10">
              <Image
                src={property?.images[selectedImageIndex]}
                alt={property.title}
                fill
                className="object-cover w-full rounded-lg "
              />
            </div>

            {property?.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {property?.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto ">
                    {property?.images?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-[200px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200
          ${
            selectedImageIndex === index
              ? "border-red-400"
              : "border-transparent hover:border-gray-300"
          } 
        `}
                      >
                        <Image
                          src={image}
                          alt={`Image ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400">No images available</span>
        )}
      </div>

      {/* Content */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {property?.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin />
              <span>
                {property?.address}, {property?.city}, {property?.state}{" "}
                {property?.zipCode}
              </span>
            </div>

            <div className=" flex items-center gap-2  mb-4">
              <p className="text-3xl font-bold text-red-600">
                {" "}
                ${property?.price?.toLocaleString()}
              </p>

              {property?.status === "for-rent" && (
                <span className="text-lg text-gray-600">/month</span>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="border bg-white p-6 rounded-lg">
            <h3 className="mb-5 font-bold">Property Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {property?.bedrooms} Bedrooms
                </p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {property?.bathrooms} Bathrooms
                </p>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Square className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">{property?.area} Sq Ft</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {property?.propertyType} Type
                </p>
              </div>
            </div>
          </div>

          {/* Description */}

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-bold">Desctiption</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {property?.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* contact card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-bold text-lg">Contact Information</h3>
            <div className="flex flex-col justify-center items-center mt-5 space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[200px]">Contact Agent</Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <div className="flex items-center gap-4 mt-4">
                        <Image
                          width={100}
                          height={100}
                          alt="whatsapp"
                          src="/WhatsApp.webp"
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            +90 442 512 24
                          </p>
                          <p className="text-gray-600">WhatsApp Available</p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {property?._id && (
                <ScheduleViewing
                  property={{
                    _id: property._id,
                    title: property.title,
                  }}
                />
              )}

              <Button className="w-[200px]">Save Property</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
