import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Author from "./pages/Author";
import NewPost from "./pages/NewPost";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id_post" element={<Post />} />
        <Route path="/blog/new" element={<NewPost />} />
        <Route path="/author/:id_author" element={<Author />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}