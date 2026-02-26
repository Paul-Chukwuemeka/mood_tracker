"use client";

import { appContext } from "@/contexts/appcontext";
import { useContext } from "react";

export default function Loading() {
  const { dataLoaded } = useContext(appContext);

  if (dataLoaded) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-2000 flex h-screen w-screen items-center justify-center space-x-4 bg-white">
      <div className="h-5 w-5 rounded-full bg-header animate-pulse [animation-delay:-0.3s]"></div>
      <div className="h-5 w-5 rounded-full bg-header animate-pulse [animation-delay:-0.15s]"></div>
      <div className="h-5 w-5 rounded-full bg-header animate-pulse"></div>
    </div>
  );
}
