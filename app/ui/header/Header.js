// components/header/Header.js
"use client";

import "./Header.css";

import { CiSettings } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineManageAccounts, MdLogout } from "react-icons/md";

export default function Header() {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // placeholder for logout logic
      console.log("Logged out");
    }
  };

  return (
    <div className="admin-header">
      <div>
        <VscAccount className="admin-header-icons" />
        <MdOutlineManageAccounts className="admin-header-icons" />
        <CiSettings className="admin-header-icons" />
        <MdLogout className="admin-header-icons" onClick={handleLogout} />
      </div>
    </div>
  );
}
