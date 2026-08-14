"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";

export default function ConnectUserToConvex() {
  const { user } = useUser();

  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) {
      return;
    }

    const syncUser = async () => {
      try {
        await updateUser({
          userId: user.id,
          name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
          email: user.emailAddresses[0]?.emailAddress ?? "",
        });
      } catch (error) {
        console.error("Error Syncing user:", error);
      }
    };

    syncUser();
  }, [user, updateUser]);

  return null;
}
