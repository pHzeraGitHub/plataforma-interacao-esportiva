// src/PessoasCrud.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PessoasCrud() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v2';

  const [pessoas, setPessoas] = useState([]);
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Carrega lista de pessoas
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${API}/pessoas/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setPessoas)
      .catch(console.error);
  }, [API]);

  // Limpa o formulário
  const resetForm = () => {
    setEmail('');
    setTelefone('');
    setIsEditing(false);
    setEditId(null);
  };

  // Submete cadastro ou atualização
  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${API}/pessoas/${editId}/`
      : `${API}/pessoas/`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, telefone })
    })
      .then(res => res.json())
      .then(data => {
        if (isEditing) {
          setPessoas(pessoas.map(p => (p.id === data.id ? data : p)));
        } else {
          setPessoas([...pessoas, data]);
        }
        resetForm();
      })
      .catch(console.error);
  };

  // Edita uma pessoa (pré-preenche o form)
  const handleEdit = pessoa => {
    setEmail(pessoa.email);
    setTelefone(pessoa.telefone || '');
    setIsEditing(true);
    setEditId(pessoa.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Deleta uma pessoa
  const handleDelete = id => {
    const token = localStorage.getItem('accessToken');
    fetch(`${API}/pessoas/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setPessoas(pessoas.filter(p => p.id !== id)))
      .catch(console.error);
  };

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-3"
      >
        ← Voltar
      </button>

      <h2>Pessoas</h2>
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            className="form-control"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            placeholder="(00) 00000-0000"
            required
          />
        </div>
        <div className="col-md-2 text-end">
          <button className="btn btn-primary">
            {isEditing ? 'Atualizar' : 'Cadastrar Pessoa'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {pessoas.map(p => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{p.id}</strong> — {p.email} — {p.telefone || '-'}
            </span>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
