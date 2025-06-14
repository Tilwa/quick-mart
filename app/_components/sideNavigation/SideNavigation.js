"use client";

import Link from "next/link";
import {
  ArrowLongLeftIcon,
  FolderIcon,
  HomeIcon,
  FolderPlusIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "../signOutButton/SignOutButton";
import { usePathname } from "next/navigation";

import "./SideNavigation.css";

const navLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <HomeIcon width={20} height={20} />,
  },
  {
    name: "All Products ssssssss",
    href: "/dashboard/all-products",
    icon: <FolderIcon width={20} height={20} />,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: <FolderIcon width={20} height={20} />,
  },

  {
    name: "Add Product",
    href: "/dashboard/add-product",
    icon: <FolderPlusIcon width={20} height={20} />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <WrenchIcon width={20} height={20} />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="navigation-menu">
      <ul>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
