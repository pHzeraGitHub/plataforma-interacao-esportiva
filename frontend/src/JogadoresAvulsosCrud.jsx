import React, { useEffect, useState } from 'react';

export default function JogadoresAvulsos() {
  const [lista, setLista] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [form, setForm] = useState({ pessoa: '', posicao: '' });

  useEffect(() => {
    // 1) Carrega as pessoas disponíveis
    fetch('http://localhost:8000/api/v2/pessoas/')
      .then(res => res.json())
      .then(setPessoas)
      .catch(console.error);

    // 2) Carrega os jogadores avulsos
    fetch('http://localhost:8000/api/v2/jogadores-avulsos/')
      .then(res => res.json())
      .then(setLista)
      .catch(console.error);
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Só submete se tiver selecionado uma pessoa
    if (!form.pessoa) return alert('Selecione uma pessoa');

    fetch('http://localhost:8000/api/v2/jogadores-avulsos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, disponibilidade: true })
    })
      .then(res => res.json())
      .then(novo => {
        setLista([...lista, novo]);
        // limpa só o campo de posição
        setForm({ pessoa: form.pessoa, posicao: '' });
      })
      .catch(console.error);
  };

  const handleDelete = id => {
    fetch(`http://localhost:8000/api/v2/jogadores-avulsos/${id}/`, {
      method: 'DELETE'
    })
      .then(() => setLista(lista.filter(j => j.id !== id)))
      .catch(console.error);
  };

  return (
    <div className="container mt-4">
      <h2>Jogadores Avulsos</h2>

      <form onSubmit={handleSubmit} className="row g-2 mb-4 align-items-end">
        {/* Select de Pessoas */}
        <div className="col">
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

        {/* Campo Posição */}
        <div className="col">
          <label className="form-label">Posição</label>
          <input
            name="posicao"
            placeholder="Ex: Atacante"
            value={form.posicao}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </div>
      </form>

      {/* Tabela de Listagem */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Pessoa (email)</th>
            <th>Posição</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(j => (
            <tr key={j.id}>
              <td>{pessoas.find(p => p.id === j.pessoa)?.email || j.pessoa}</td>
              <td>{j.posicao}</td>
              <td>{j.disponibilidade ? '✔️' : '❌'}</td>
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
