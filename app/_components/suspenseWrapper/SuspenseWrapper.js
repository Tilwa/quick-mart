"use client";

import { Suspense } from "react";

export default function SuspenseWrapper({ fallback = "Loading...", children }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
