import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Author() {
  const { id_author } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/author/${id_author}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setAuthor(data))
      .catch(error => console.log(error));
  }, [id_author]);

  if (!author) return <div className="page"><p className="section-title">Loading...</p></div>;

  return (
    <div className="page">
      <div className="author-card">
        <h1 className="author-name">{author.name}</h1>
        <p className="author-detail">{author.birth_date}</p>
        <p className="author-detail">{author.phone}</p>
        <p className="author-detail">{author.email}</p>
      </div>
    </div>
  );
}