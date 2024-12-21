import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Projects from "../routes/Projects";
import Project from "../routes/Project";
import Skills from "../routes/Skills";
import Skill from "../routes/Skill";
import Contact from "../routes/Contact";
import Login from "../dashboard/Login";

function NormalRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/project/:id" element={<Project />} />
        <Route exact path="/skills" element={<Skills />} />
        <Route exact path="/skill/:id" element={<Skill />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/admin" element={<Login />} />
      </Routes>
    </div>
  );
}

export default NormalRoutes;
