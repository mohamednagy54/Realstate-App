import { v } from "convex/values";
import { mutation } from "./_generated/server";






export const createViewing = mutation({
  args: {
    propertyId: v.id("properties"),
    propertyTitle: v.string(),
    userEmail: v.string(),
    userName: v.string(),
    userPhone: v.optional(v.string()),
    viewingDate: v.string(),
    viewingTime: v.string(),
    message: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => { 
    const viewingId = await ctx.db.insert("propertyViewings", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    })

    return viewingId
  }
});