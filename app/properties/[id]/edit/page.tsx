"use client";

import PropertyForm from "@/app/_components/PropertyForm";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    params.then((resolvedParams) => {
      setPropertyId(resolvedParams?.id);
    });
  }, [[params]]);

  const property = useQuery(
    api.properties.getSingleProperty,
    propertyId ? { id: propertyId as any } : "skip"
  );

  if (!propertyId && property === undefined) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading property...
      </div>
    );
  }

  if (property === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2> Property not found</h2>
        <Link href="/properties">
          <Button>Go Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <PropertyForm
        propertyId={propertyId}
        initialData={property}
        isEditing={true}
      />
    </div>
  );
}
