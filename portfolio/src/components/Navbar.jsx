import { useLocation } from "react-router-dom";
import DashboardNavbar from "./DashbaordNavbar";
import NormalNavbar from "./NormalNavbar";

function Navbar() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  if (isDashboardRoute && !localStorage.Loggedin) {
    return <NormalNavbar />;
  }
  if (isDashboardRoute) {
    return <DashboardNavbar />;
  }
  if (!isDashboardRoute) {
    return <NormalNavbar />;
  }
}

export default Navbar;
