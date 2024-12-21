import { Routes, Route } from "react-router-dom";
import Dhome from "../dashboard/Dhome";
import Dprojects from "../dashboard/Dprojects";
import Dproject from "../dashboard/Dproject";
import Dskills from "../dashboard/Dskills";
import Dskill from "../dashboard/Dskill";
// import DashboardNavbar from "./DashbaordNavbar";

function DashboardRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/dashboard/" element={<Dhome />} />
        <Route exact path="/dashboard/projects" element={<Dprojects />} />
        <Route exact path="/dashboard/project/:id" element={<Dproject />} />
        <Route exact path="/dashboard/skills" element={<Dskills />} />
        <Route exact path="/dashboard/skill/:id" element={<Dskill />} />
      </Routes>
    </div>
  );
}

export default DashboardRoutes;
