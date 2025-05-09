import SideNavigation from "@/app/_components/sideNavigation/SideNavigation";

export const metadata = {
  title: {
    template: "%s / Quick Mart",
    default: "Dashboard / Quick Mart",
  },
  description: "add later",
};
import "./layout.css";
import DashboardHeader from "../_components/dashboardHeader/DashboardHeader";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      {/* <SideNavigation /> */}
      <div className="sidebar-navigation">
        <div className="db-logo">
          <span className="quick-title">Quick</span>
          <span className="mart-title">Mart</span>
        </div>
        <SideNavigation />
      </div>
      <div className="dasboard-view-container">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
