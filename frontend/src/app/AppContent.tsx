import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from "react-router";
import { NavBar, SideBar } from "../widgets";
import { useTheme } from "../core/theme/useTheme";
import "./AppContent.css";
import "./styles/index.css";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`app-page page_theme_${theme}`}>
      <SideBar />
      <div className="navbar-and-content">
        <NavBar />
        <div className="content">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export { AppContent };
