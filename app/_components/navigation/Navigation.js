import Link from "next/link";
import { auth } from "@/app/_lib/auth";

import "./Navigation.css";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="navigation">
      <ul className="menu">
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/all-products">All Products</Link>
        </li>
        <li>
          <Link href="/deals">Deals</Link>
        </li>
      </ul>
    </nav>
  );
}
