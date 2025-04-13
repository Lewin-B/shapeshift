import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";
import { NextRequest } from "next/server";
import { db } from "~/server/db";

import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = async (req: NextRequest) => {
  try {
    return await createTRPCContext({
      headers: req.headers,
    });
  } catch (error) {
    console.error("Error in tRPC createContext:", error);
    // Return a minimal context that won't break the handler
    return {
      headers: req.headers,
      db,
      session: null,
    };
  }
};

// Create a parameter-less context creator for createCaller
const createContextForCaller = async () => {
  const headersList = headers();
  const mockReq = {
    headers: headersList,
    cookies: { getAll: () => [] },
    nextUrl: { pathname: '', search: '', toString: () => '', clone: () => ({}) },
  } as unknown as NextRequest;  
  return createContext(mockReq);
};

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContextForCaller);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);