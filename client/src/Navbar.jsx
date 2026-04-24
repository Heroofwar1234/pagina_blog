import { Link, NavLink } from "react-router";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        INICIO
      </NavLink>
      <NavLink to="/blog" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        BLOG
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        CONTACTO
      </NavLink>
      <NavLink to="/author" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        AUTORES
      </NavLink>
    </nav>
  );
}
