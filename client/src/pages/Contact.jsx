import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-avatar">
          <img
            src="/src/assets/Joey2.jpeg"
            alt="Joey Alcocer Hanson"
          />
        </div>
        <h2 className="contact-name">Joey Alcocer Hanson</h2>
        <p className="contact-info">9987040769</p>
        <p className="contact-info">
          <a href="mailto:joeyalcocerdev@outlook.com">joeyalcocerdev@outlook.com</a>
        </p>
      </div>
    </div>
  );
}
