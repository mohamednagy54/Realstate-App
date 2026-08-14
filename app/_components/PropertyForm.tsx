"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { PropertyFormData } from "@/types";
import { useMutation } from "convex/react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  isEditing?: boolean;
  propertyId?: string;
}

export default function PropertyForm({
  initialData,
  isEditing = false,
  propertyId,
}: PropertyFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    area: initialData?.area || 0,
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    propertyType: initialData?.propertyType || "house",
    status: initialData?.status || "for-sale",
    images: initialData?.images || [],
    featured: initialData?.featured || false,
  });
  const [isUploading, setIsUploading] = useState(false);

  const createProperty = useMutation(api.properties.createProperty);
  const updateProperty = useMutation(api.properties.updateProperty);

  const router = useRouter();

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "bedrooms", "bathrooms", "area"].includes(name)
        ? Number(value)
        : value,
    }));
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);

    const uploadedImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const { url } = await response.json();
        uploadedImages.push(url);

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedImages],
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isEditing && propertyId) {
        await updateProperty({
          id: propertyId as any,
          ...formData,
        });
      } else {
        await createProperty(formData);
      }

      router.push("/properties");
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Failed to save property. Please try again.");
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* basic info */}
      <div className="bg-white p-6 border shadow-sm rounded-lg">
        <h3>Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="PropertyTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Title *
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded border-gray-300"
              name="title"
              id="PropertyTitle"
              value={formData?.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Description *
            </label>

            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area *
            </label>

            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      {/* Property Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3>Property Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms *
            </label>

            <select
              name="bedrooms"
              id="bedrooms"
              className="w-full p-3 border border-gray-300 rounded"
              onChange={handleInputChange}
              required
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {" "}
              Bathrooms *
            </label>

            <select
              name="bathrooms"
              value={formData?.bathrooms}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {" "}
              Property Type *
            </label>

            <select
              name="propertyType"
              value={formData?.propertyType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {" "}
              Status *
            </label>

            <select
              name="status"
              value={formData?.status}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {" "}
              Featured Property *
            </label>

            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData?.featured}
                onChange={handleCheckboxChange}
                className="w-4 h-4 border-gray-300 rounded"
              />
              <span className="ml-2  text-sm text-gray-700">
                Mark as featured property
              </span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address *
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded border-gray-300"
            name="address"
            id="address"
            value={formData?.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City *
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded border-gray-300"
            name="city"
            id="city"
            value={formData?.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State *
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded border-gray-300"
            name="state"
            id="state"
            value={formData?.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Zip Code *
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded border-gray-300"
            name="zipCode"
            id="zipCode"
            value={formData?.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      {/* Upload Button */}
      <label>
        <div className="mb-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />

            {isUploading ? "Uploading..." : "Click to upload images"}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {formData?.images?.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-5 p-4">
            {formData?.images?.map((imgUrl, index) => (
              <Image
                src={imgUrl}
                key={imgUrl}
                alt="images"
                width={150}
                height={200}
                className="object-cover"
              />
            ))}
          </div>
        )}
      </label>
      {/* Submit Button */}
      <div className="px-4 mb-2 flex justify-center items-center">
        <Button type="submit" className="text-md px-4 py-6" disabled={isUploading}>
          {isUploading ? "Uploading..." : isEditing ? "Edit Property" : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
