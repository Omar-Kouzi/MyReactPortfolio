import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { RiLoginBoxLine } from "react-icons/ri";
import Logo from "../assets/Logo.png";

const NormalNavbar = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };
  return (
    <>
      <section className="Navbar">
        <img src={Logo} alt="icon" className="Navbar-Icon" />
        <div className="Navigators">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/skills">Skills</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {/* <NavLink to="/admin">
            Login <RiLoginBoxLine />
          </NavLink> */}
        </div>
      </section>

      <button className="Navbar-Toggle" onClick={toggleNav}>
        ☰
      </button>

      <section className={`Responcive-Navbar ${isNavVisible ? "visible" : ""}`}>
        <img src={Logo} alt="icon" className="Navbar-Icon" />
        <div className="Navigators">
          <NavLink onClick={toggleNav} to="/">
            Home
          </NavLink>
          <NavLink onClick={toggleNav} to="/projects">
            Projects
          </NavLink>
          <NavLink onClick={toggleNav} to="/skills">
            Skills
          </NavLink>{" "}
          <NavLink to="/contact" onClick={toggleNav}>
            Contact
          </NavLink>
          {/* <NavLink onClick={toggleNav} to="/admin">
            Login <RiLoginBoxLine />
          </NavLink> */}
        </div>
      </section>
    </>
  );
};

export default NormalNavbar;
