"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/userAuthentication";

import "./SignOutButton.css";
function SignOutButton() {
  return (
    <div className="sign-out-container">
      <form action={signOutAction}>
        <button className="sidebar-sign-out-button">
          <ArrowRightOnRectangleIcon
            width={22}
            height={22}
            className="sidebar-logout-icon"
          />
          <span className="sidebar-logout-txt">Sign out </span>
        </button>
      </form>
    </div>
  );
}

export default SignOutButton;
