import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get All Properties
export const getProperties = query({
  args: {
    propertyType: v.optional(v.string()),
    status: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    sortOption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let properties = await ctx.db.query("properties").collect();

    // Filters

    if (args.propertyType && args.propertyType !== "all") {
      properties = properties.filter(
        (p) => p.propertyType === args.propertyType
      );
    }
    if (args.status && args.status !== "all") {
      properties = properties.filter((p) => p.status === args.status);
    }
    if (args.minPrice !== undefined) {
      properties = properties.filter((p) => p.price >= args.minPrice!);
    }
    if (args.maxPrice !== undefined) {
      properties = properties.filter((p) => p.price <= args.maxPrice!);
    }
    if (args.bedrooms !== undefined) {
      properties = properties.filter((p) => p.bedrooms >= args.bedrooms!);
    }
    if (args.bathrooms !== undefined) {
      properties = properties.filter((p) => p.bathrooms >= args.bathrooms!);
    }

    // Sorting
    switch (args.sortOption) {
      case "priceLow":
        properties.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        properties.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        properties.sort((a, b) => b._creationTime - a._creationTime);
        break;
    }

    return properties;
  },
});

// Get single Property

export const getSingleProperty = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create New Property
export const createProperty = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    area: v.number(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),

    propertyType: v.union(
      v.literal("house"),
      v.literal("apartment"),
      v.literal("condo"),
      v.literal("townhouse"),
      v.literal("cabin"),
      v.literal("villa"),
      v.literal("studio"),
      v.literal("cottage")
    ),

    status: v.union(
      v.literal("for-sale"),
      v.literal("for-rent"),
      v.literal("sold"),
      v.literal("rented")
    ),

    images: v.array(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const propertyId = await ctx.db.insert("properties", {
      title: args.title,
      description: args.description,
      price: args.price,
      bedrooms: args.bedrooms,
      bathrooms: args.bathrooms,
      area: args.area,
      address: args.address,
      city: args.city,
      state: args.state,
      zipCode: args.zipCode,
      propertyType: args.propertyType,
      status: args.status,
      images: args.images,
      featured: args.featured || false,
    });

    return propertyId;
  },
});

// Update a Property
export const updateProperty = mutation({
  args: {
    id: v.id("properties"),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    area: v.number(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),

    propertyType: v.union(
      v.literal("house"),
      v.literal("apartment"),
      v.literal("condo"),
      v.literal("townhouse"),
      v.literal("cabin"),
      v.literal("villa"),
      v.literal("studio"),
      v.literal("cottage")
    ),

    status: v.union(
      v.literal("for-sale"),
      v.literal("for-rent"),
      v.literal("sold"),
      v.literal("rented")
    ),

    images: v.array(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Delete Property

export const deleteProperty = mutation({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Get Featured Properties

export const getFeaturedProperties = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("properties")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});
