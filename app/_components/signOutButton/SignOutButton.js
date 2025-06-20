"use client";

import { signOutAction } from "@/app/_lib/userAuthentication";
import { FaSignOutAlt } from "react-icons/fa";
import "./SignOutButton.css";
function SignOutButton() {
  return (
    <div className="sign-out-container">
      <form action={signOutAction}>
        <button className="sidebar-sign-out-button">
          <FaSignOutAlt className="signout-menu-icon" />
          <span className="sidebar-logout-txt">Sign out </span>
        </button>
      </form>
    </div>
  );
}

export default SignOutButton;
