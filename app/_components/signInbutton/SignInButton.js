"use client";

import { signInAction } from "@/app/_lib/userAuthentication";
import "./SignInButton.css";

function SignInButton() {
  return (
    <div className="sign-in-card">
      <form action={signInAction}>
        <button className="sign-in-button">
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
}

export default SignInButton;
