import "./Contact.css";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


export default function Contact() {
  const isAuth = useAuth();
  if (isAuth === null) return <div className="page"><p className="section-title">Loading...</p></div>;

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
