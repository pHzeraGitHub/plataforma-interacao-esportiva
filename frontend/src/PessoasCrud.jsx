// frontend/src/PessoasCrud.jsx
import React, { useEffect, useState } from 'react';

export default function PessoasCrud() {
  const [pessoas, setPessoas] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/v2/pessoas/')
      .then(r => r.json())
      .then(setPessoas);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8000/api/v2/pessoas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(r => r.json())
      .then(nova => {
        setPessoas([...pessoas, nova]);
        setEmail('');
      });
  };

  return (
    <div className="container mt-4">
      <h2>Pessoas</h2>
      <form className="row g-2 mb-4" onSubmit={handleSubmit}>
        <div className="col">
          <input
            type="email"
            className="form-control"
            placeholder="email@exemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Cadastrar Pessoa</button>
        </div>
      </form>
      <ul className="list-group">
        {pessoas.map(p => (
          <li key={p.id} className="list-group-item">
            {p.id} — {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
