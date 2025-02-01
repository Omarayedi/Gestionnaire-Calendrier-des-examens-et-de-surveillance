import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Main App Component
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-blue-600 p-4 text-white shadow-md">
          <ul className="flex space-x-6 justify-center">
            <li><Link to="/exams" className="hover:underline">Gestion des Examens</Link></li>
            <li><Link to="/rooms" className="hover:underline">Réservation des Salles</Link></li>
            <li><Link to="/invigilators" className="hover:underline">Affectation des Surveillants</Link></li>
          </ul>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto p-6">
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
      <h1 className="text-3xl font-bold">Bienvenue dans le système de gestion</h1>
      <p className="mt-4 text-gray-600">Veuillez choisir une section pour commencer.</p>
    </div>
  );
}

// Gestion des Examens Component
function GestionExamens() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des Examens</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Ajouter un Examen</button>
      {/* Placeholder for exam management */}
      <p className="mt-4 text-gray-600">Interface pour ajouter, modifier et supprimer des examens.</p>
    </div>
  );
}

// Réservation des Salles Component
function GestionSalles() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Réservation des Salles</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Réserver une Salle</button>
      {/* Placeholder for room management */}
      <p className="mt-4 text-gray-600">Interface pour consulter et réserver des salles.</p>
    </div>
  );
}

// Affectation des Surveillants Component
function GestionSurveillants() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Affectation des Surveillants</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Affecter un Surveillant</button>
      {/* Placeholder for invigilator assignment */}
      <p className="mt-4 text-gray-600">Interface pour affecter les surveillants aux examens.</p>
    </div>
  );
}
