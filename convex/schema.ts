import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    userId: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_email", ["email"]),

  properties: defineTable({
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
  }),

  propertyViewings: defineTable({
    propertyId: v.id("properties"),
    propertyTitle: v.string(),
    userEmail: v.string(),
    userName: v.string(),
    userPhone: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("confirmed")),

    viewingDate: v.string(),
    viewingTime: v.string(),
    message: v.optional(v.string()),

    createdAt: v.number(),
    userId: v.optional(v.string()),
  })
    .index("by_property", ["propertyId"])
    .index("by_user", ["userId"])
    .index("by_email", ["userEmail"]),
});
