import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JogadoresAvulsos from './JogadoresAvulsosCrud';
import PessoasCrud from './PessoasCrud';

export default function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="mb-4">
          <Link to="/pessoas" className="btn btn-outline-secondary me-2">
            Pessoas
          </Link>
          <Link to="/avulsos" className="btn btn-outline-primary">
            Jogadores Avulsos
          </Link>
        </nav>
        <Routes>
          <Route path="/pessoas" element={<PessoasCrud />} />
          <Route path="/avulsos" element={<JogadoresAvulsos />} />
          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
}
