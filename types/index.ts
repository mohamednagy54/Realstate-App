import { Doc } from "./../convex/_generated/dataModel.d";

export type Property = Doc<"properties">;

export type PropertyType = "house" | "apartment" | "condo" | "townhouse";

export type PropertyType = 
  | "house" 
  | "apartment" 
  | "condo" 
  | "townhouse" 
  | "cabin" 
  | "villa" 
  | "studio" 
  | "cottage";

export interface PropertyFilters {
  propertyType?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortOption?: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  images: string[];
  featured?: boolean;
}
