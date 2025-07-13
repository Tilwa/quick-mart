"use client";
import Link from "next/link";
// import { auth } from "@/app/_lib/auth";

import "./Navigation.css";

export default function Navigation() {
  // const session = await auth();

  return (
    <nav className="navigation">
      <ul className="menu">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/all-products">All Products</Link>
        </li>
        <li>
          <Link href="/policy">Policy</Link>
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
        </li>
        <li>
          <Link href="/contact-us">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}
