import SignInButton from "@/app/_components/signInbutton/SignInButton";
import { FaUserCircle } from "react-icons/fa";
// export const metadata = {
//   title: "Login",
// };

import "./page.css";
import Header from "../_components/header/Header";
export default function Page() {
  return (
    <div>
      <Header />
      <div className="admin-login">
        <div className="admin-card">
          <FaUserCircle className="admin-card-icon" />
          <div className="admin-card-content">
            <h2>Dashboard Login</h2>

            <SignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
