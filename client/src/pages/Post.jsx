import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Post() {
  const { id_post } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/posts/${id_post}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id_post]);

  if (!post) return <div className="page"><p className="section-title">Loading...</p></div>;

  return (
    <div className="page">
      <div className="post-card">
        <div className="post-image">
          {post.image && <img src={post.image} alt={post.title} />}
        </div>
        <div className="post-body">
          <h1 className="post-title">{post.title}</h1>
          <span className="date">{post.date}</span>
          <p className="post-text">{post.text}</p>
          <Link to={"/author/" + post.id_author} className="post-author-link">
            View Author →
          </Link>
        </div>
      </div>
    </div>
  );
}