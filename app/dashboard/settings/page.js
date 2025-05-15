"use client";

import { useState } from "react";
import "./page.css";
// import { useForm } from "react-hook-form";
// import { useUser } from "../../../features/authentication/useUser";

export default function AdminSettings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // This can be used if your `useUser` hook provides user data or loading state
  // const { user, isLoading } = useUser?.() || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: Implement your update logic here
    // signup(
    //   { username, email, password },
    //   {
    //     onSettled: () => reset(),
    //   }
    // );
  };

  return (
    <div>
      <h1 className="settings-title">Settings</h1>

      <div className="add-new-word">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter your full name"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirm-password">Repeat Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Enter your password again"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="error-text">{error}</p>}

            {/* Action Buttons */}
            <div className="add-form-btn">
              <button type="reset" className="cancel-word-button">
                Cancel
              </button>
              <button type="submit" className="add-word-button">
                Update Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
