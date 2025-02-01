import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

// Main App Component
export default function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-md">
          <div className="container-fluid">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link to="/exams" className="nav-link">Gestion des Examens</Link></li>
              <li className="nav-item"><Link to="/rooms" className="nav-link">Réservation des Salles</Link></li>
              <li className="nav-item"><Link to="/invigilators" className="nav-link">Affectation des Surveillants</Link></li>
            </ul>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container my-5">
          <Routes>
            <Route path="/exams" element={<GestionExamens />} />
            <Route path="/rooms" element={<GestionSalles />} />
            <Route path="/invigilators" element={<GestionSurveillants />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Home Page Component
function Home() {
  return (
    <div className="text-center">
      <h1 className="display-4">Bienvenue dans le système de gestion</h1>
      <p className="mt-4 text-muted">Veuillez choisir une section pour commencer.</p>
    </div>
  );
}

// Gestion des Examens Component
function GestionExamens() {
  return (
    <div>
      <h1 className="h3 mb-4">Gestion des Examens</h1>
      <button className="btn btn-primary">Ajouter un Examen</button>
      {/* Placeholder for exam management */}
      <p className="mt-4 text-muted">Interface pour ajouter, modifier et supprimer des examens.</p>
    </div>
  );
}

// Réservation des Salles Component
function GestionSalles() {
  return (
    <div>
      <h1 className="h3 mb-4">Réservation des Salles</h1>
      <button className="btn btn-success">Réserver une Salle</button>
      {/* Placeholder for room management */}
      <p className="mt-4 text-muted">Interface pour consulter et réserver des salles.</p>
    </div>
  );
}

// Affectation des Surveillants Component
function GestionSurveillants() {
  return (
    <div>
      <h1 className="h3 mb-4">Affectation des Surveillants</h1>
      <button className="btn btn-danger">Affecter un Surveillant</button>
      {/* Placeholder for invigilator assignment */}
      <p className="mt-4 text-muted">Interface pour affecter les surveillants aux examens.</p>
    </div>
  );
}
