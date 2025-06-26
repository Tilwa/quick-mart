"use client";
import { usePathname } from "next/navigation";

function Page() {
  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");
  return <div>product page {formattedPath}</div>;
}

export default Page;
