// components/sidebar/Sidebar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import "./Sidebar.css";

import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";

import { BsDatabaseFillAdd } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";
import SignOutButton from "@/app/_components/signOutButton/SignOutButton";

export default function Sidebar() {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // placeholder for logout logic
      console.log("Logged out");
    }
  };

  return (
    <div className="admin-sidebar-container">
      <Link href="/" className="logo-link">
        <div>
          <span className="quick-title">Quick</span>
          <span className="mart-title">Mart</span>
        </div>
      </Link>

      {/* sidebar menu */}
      <div className="main-sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link href="/dashboard">
              <div className="sidebar-menu-item">
                <IoHome className="sidebar-menu-icon" />
                <p>Home</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/add-product">
              <div className="sidebar-menu-item">
                <BsDatabaseFillAdd className="sidebar-menu-icon" />
                <p>Add Product</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/all-products">
              <div className="sidebar-menu-item">
                <IoMdListBox className="sidebar-menu-icon" />
                <p>All Products</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/orders">
              <div className="sidebar-menu-item">
                <FaUser className="sidebar-menu-icon" />
                <p>Orders</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/settings">
              <div className="sidebar-menu-item">
                <FaCog className="sidebar-menu-icon" />
                <p>Settings</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <SignOutButton />
    </div>
  );
}
