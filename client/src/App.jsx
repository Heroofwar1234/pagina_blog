import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Author from "./pages/Author";
import NewPost from "./pages/NewPost";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";
import "./App.css";

export default function App() {
  const { isAuth, setIsAuth } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://localhost:8000/logout", { credentials: "include" })
      .then(() => {
        setIsAuth(false);
        navigate("/");
      });
  }

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
        <div style={{ marginLeft: 'auto' }}>
          {isAuth
            ? <button className="navbar-btn" onClick={handleLogout}>Logout</button>
            : <Link to="/login">Login</Link>
          }
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/new" element={<NewPost />} />
        <Route path="/blog/:id_post" element={<Post />} />
        <Route path="/author/:id_author" element={<Author />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}