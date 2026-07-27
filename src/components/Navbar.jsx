import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./index.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setIsOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand" onClick={closeMenu}>SantéProx</Link>

      <button
        type="button"
        className="burger"
        aria-label="Menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links${isOpen ? " open" : ""}`}>
        <Link to="/pharmacies-de-garde" onClick={closeMenu}>Pharmacies de garde</Link>
        <Link to="/recherche-medicament" onClick={closeMenu}>Recherche médicament</Link>
        <Link to="/rendez-vous" onClick={closeMenu}>Prendre RDV</Link>
        {user?.role === "pro" && <Link to="/espace-pro" onClick={closeMenu}>Espace pro</Link>}
        {user?.role === "admin" && <Link to="/admin" onClick={closeMenu}>Dashboard Admin</Link>}
        {user && <Link to="/mes-rendez-vous" onClick={closeMenu}>Mes RDV</Link>}
        {!user && <Link to="/connexion" onClick={closeMenu}>Connexion</Link>}
        {!user && <Link to="/inscription" onClick={closeMenu}>Inscription</Link>}
        {user && (
          <button className="link-button" onClick={handleLogout}>
            Déconnexion ({user.nom})
          </button>
        )}
      </div>
    </nav>
  );
}
