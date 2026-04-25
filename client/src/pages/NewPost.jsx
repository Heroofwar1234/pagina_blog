import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [img, setImg] = useState(null);
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('text', text);
    if (img) formData.append('img', img);

    await fetch('http://localhost:8000/posts/new', {
      method: 'POST',
      body: formData
    });

    navigate('/blog');
  };

  return (
    <div className="page">
      <div className="new-post-card">
        <h2 className="section-title">Nuevo Post</h2>

        <div className="form-grid">
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Fecha</label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Imagen</label>
          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          />

          <label>Texto</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        </div>

        <div className="form-submit">
          <button onClick={handleSubmit}>Crear Post</button>
        </div>
      </div>
    </div>
  );
}