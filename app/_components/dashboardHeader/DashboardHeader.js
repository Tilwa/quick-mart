import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import "./DashboardHeader.css";
function DashboardHeader() {
  return (
    <div className="db-header">
      <div className="db-header-icons">
        <IoSettingsOutline className="logout-icon" />
        <IoMdNotificationsOutline className="logout-icon" />
        <IoLogOutOutline className="logout-icon" />
      </div>
    </div>
  );
}

export default DashboardHeader;
