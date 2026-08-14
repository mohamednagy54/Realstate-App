import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { userId, email, name }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name,
        email,
      });

      return existingUser;
    }

    // Create User
    const newUserId = await ctx.db.insert("users", {
      userId,
      name,
      email,
    });

    return newUserId
  },
});
