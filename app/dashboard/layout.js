import Sidebar from "@/app/ui/sidebar/Sidebar";
import Header from "@/app/ui/header/Header";
import "./layout.css";

export const metadata = {
  title: {
    template: "%s / Quick Mart",
    default: "Dashboard / Quick Mart",
  },
  description: "add later",
};

export default function Layout({ children }) {
  return (
    <div className="admin-app-layout">
      <div className="admin-sidebar">
        <Sidebar />
      </div>

      <div className="admin-header-outlet">
        <Header />
        <main id="main-content-container">{children}</main>
      </div>
    </div>
  );
}
