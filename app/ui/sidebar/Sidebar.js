// components/sidebar/Sidebar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import "./Sidebar.css";

import { FaCog, FaSignOutAlt, FaUser, FaStore } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";
import SignOutButton from "@/app/_components/signOutButton/SignOutButton";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // placeholder for logout logic
      console.log("Logged out");
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  return (
    <div className="admin-sidebar-container sidebar hide-scrollbar">
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
            <Link href="#">
              <div className="sidebar-menu-item">
                <FaStore className="sidebar-menu-icon" />
                <div className="sidebar-menu-dropdown" onClick={toggleDropdown}>
                  <p>Ecommerce</p>
                  <span id="dropdown-icon-arrow">
                    {" "}
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
              </div>
            </Link>
            {isOpen && (
              <ul className="dropdown-list">
                <li>
                  <Link href="/dashboard/add-product">
                    <div className="sidebar-menu-item sidebar-dropdown-menu-item">
                      <BsDatabaseFillAdd className="sidebar-menu-icon" />
                      <p>Add Product</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/all-products">
                    <div className="sidebar-menu-item sidebar-dropdown-menu-item">
                      <IoMdListBox className="sidebar-menu-icon" />
                      <p>All Products</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/product-colors">
                    <div className="sidebar-menu-item sidebar-dropdown-menu-item">
                      <IoIosColorPalette className="sidebar-menu-icon" />
                      <p>Product Colors</p>
                    </div>
                  </Link>
                </li>
              </ul>
            )}
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
