import { useLocation } from "react-router-dom";
import NormalRoutes from "./NormalRouter";
import DashboardRoutes from "./DashboardRouter";

function Routes() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  if (isDashboardRoute && !localStorage.Loggedin) {
    return (
      <div>
        
          <h3>Your not supposed to be here</h3>
        
      </div>
    );
  }
  return (
    <div>
        {isDashboardRoute ? <DashboardRoutes /> : <NormalRoutes />}
    
    </div>
  );
}

export default Routes;
