import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-avatar">
          <img
            src="/src/assets/Joey1.jpeg"
            alt="Profile"
          />
        </div>
        <div className="home-banner">
          <h1>¡HOLA!</h1>
        </div>
      </div>

      <div className="home-bio">
        <p>
          Bienvenido a mi blog de películas.
        </p>
        <p>— Joey Alcocer Hanson</p>
      </div>
    </div>
  );
}
