// src/JogadoresAvulsosCrud.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JogadoresAvulsos() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v2';

  const diasSemana = [
    'MONDAY','TUESDAY','WEDNESDAY','THURSDAY',
    'FRIDAY','SATURDAY','SUNDAY'
  ];

  const [lista, setLista] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [form, setForm] = useState({
    pessoa: '',
    posicao: '',
    disponibilidade: true,
    disponibilidades: [],
    horario: ''      // novo campo
  });

  // carrega Pessoas e Avulsos
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    Promise.all([
      fetch(`${API}/pessoas/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()),
      fetch(`${API}/jogadores-avulsos/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json())
    ])
      .then(([ps, js]) => { setPessoas(ps); setLista(js); })
      .catch(console.error);
  }, [API]);

  // atualiza inputs de texto e checkbox geral
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]:
        type === 'checkbox' && name === 'disponibilidade'
          ? checked
          : value
    }));
  };

  // alterna dias de semana
  const toggleDia = dia => {
    setForm(f => ({
      ...f,
      disponibilidades: f.disponibilidades.includes(dia)
        ? f.disponibilidades.filter(d => d !== dia)
        : [...f.disponibilidades, dia]
    }));
  };

  // submete cadastro
  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    fetch(`${API}/jogadores-avulsos/`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then(r => r.json())
      .then(novo => {
        setLista(prev => [...prev, novo]);
        setForm({
          pessoa: form.pessoa,
          posicao: '',
          disponibilidade: true,
          disponibilidades: [],
          horario: ''
        });
      })
      .catch(console.error);
  };

  // deleta registro
  const handleDelete = id => {
    const token = localStorage.getItem('accessToken');
    fetch(`${API}/jogadores-avulsos/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setLista(prev => prev.filter(j => j.id !== id)))
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
      <h2>Jogadores Avulsos</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3 align-items-end">
          {/* Pessoa */}
          <div className="col-md-3">
            <label className="form-label">Pessoa</label>
            <select
              name="pessoa"
              value={form.pessoa}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">— Selecione —</option>
              {pessoas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.email}
                </option>
              ))}
            </select>
          </div>

          {/* Posição */}
          <div className="col-md-3">
            <label className="form-label">Posição</label>
            <input
              name="posicao"
              value={form.posicao}
              onChange={handleChange}
              className="form-control"
              placeholder="Ex: Atacante"
              required
            />
          </div>

          {/* Disponibilidade Geral */}
          <div className="col-md-2 form-check">
            <input
              id="dispGeral"
              name="disponibilidade"
              type="checkbox"
              checked={form.disponibilidade}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="dispGeral" className="form-check-label">
              Disponível
            </label>
          </div>

          {/* Horário */}
          <div className="col-md-2">
            <label className="form-label">Horário</label>
            <input
              type="time"
              name="horario"
              value={form.horario}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Dias da Semana */}
          <div className="col-md-7">
            <label className="form-label">Dias da Semana</label>
            <div className="d-flex flex-wrap">
              {diasSemana.map(d => (
                <div key={d} className="form-check me-3">
                  <input
                    id={`dia-j-${d}`}
                    type="checkbox"
                    className="form-check-input"
                    checked={form.disponibilidades.includes(d)}
                    onChange={() => toggleDia(d)}
                  />
                  <label
                    htmlFor={`dia-j-${d}`}
                    className="form-check-label"
                  >
                    {d.slice(0,3)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-end mt-3">
          <button className="btn btn-primary">Cadastrar</button>
        </div>
      </form>

      {/* Tabela */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Posição</th>
            <th>Disp.</th>
            <th>Horário</th>
            <th>Dias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(j => (
            <tr key={j.id}>
              <td>{pessoas.find(p => p.id === j.pessoa)?.email}</td>
              <td>{j.posicao}</td>
              <td>{j.disponibilidade ? '✔️' : '❌'}</td>
              <td>{j.horario || '-'}</td>
              <td>{(j.disponibilidades||[]).join(', ')}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(j.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
