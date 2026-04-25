import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuth } = useAuthContext();

  function handleSubmit() {
    const formInfo = new FormData();
    formInfo.append("username", username);
    formInfo.append("password", password);

    fetch("http://localhost:8000/login", {
      method: "POST",
      credentials: "include",
      body: formInfo
    })
      .then((res) => {
        if (res.status === 401) {
          setError('Invalid username or password');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setIsAuth(true);
          navigate('/blog');
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="page">
      <div className="new-post-card">
        <h2 className="section-title">Login</h2>

        <div className="form-grid">
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: 12, fontSize: 13 }}>
            {error}
          </p>
        )}

        <div className="form-submit">
          <button onClick={handleSubmit}>Entrar</button>
        </div>
      </div>
    </div>
  );
}