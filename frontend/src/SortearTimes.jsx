// src/SortearTimes.jsx
import React, { useState } from 'react';

export default function SortearTimes() {
  const [input, setInput] = useState('');
  const [teams, setTeams] = useState({ team1: [], team2: [] });
  const [error, setError] = useState('');

  const handleSortear = () => {
    setError('');
    // separa linhas, remove vazias e pega até 10
    const names = input
      .split('\n')
      .map(n => n.trim())
      .filter(n => n !== '')
      .slice(0, 10);

    if (names.length < 2) {
      setError('Digite ao menos 2 nomes.');
      return;
    }

    // embaralha
    const shuffled = names
      .map(name => ({ name, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ name }) => name);

    const meio = Math.ceil(shuffled.length / 2);
    setTeams({
      team1: shuffled.slice(0, meio),
      team2: shuffled.slice(meio),
    });
  };

  return (
    <div className="container mt-4">
      <h2>Sorteio de Times</h2>
      <p>Digite até 10 nomes (um por linha):</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <textarea
        className="form-control mb-3"
        rows={10}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ex:\nAlice\nBruno\nCarla\n..."
      />
      <button className="btn btn-primary mb-4" onClick={handleSortear}>
        Sortear
      </button>

      <div className="row">
        <div className="col-md-6">
          <h5>Time A ({teams.team1.length})</h5>
          <ul className="list-group">
            {teams.team1.map((n, i) => (
              <li key={i} className="list-group-item">
                {n}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h5>Time B ({teams.team2.length})</h5>
          <ul className="list-group">
            {teams.team2.map((n, i) => (
              <li key={i} className="list-group-item">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
