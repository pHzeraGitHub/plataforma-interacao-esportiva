import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Home from './Home';
import PessoasCrud from './PessoasCrud';
import JogadoresAvulsos from './JogadoresAvulsosCrud';
import PrivateRoute from './PrivateRoute';
import SortearTimes from './SortearTimes';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/pessoas"
          element={
            <PrivateRoute>
              <PessoasCrud />
            </PrivateRoute>
          }
        />
        <Route
          path="/avulsos"
          element={
            <PrivateRoute>
              <JogadoresAvulsos />
            </PrivateRoute>
          }
        />
          <Route
          path="/sorteio"
          element={
          <PrivateRoute>
            <SortearTimes />
          </PrivateRoute>
          }
  />


        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h2>Página não encontrada</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
