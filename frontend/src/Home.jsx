import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [meme, setMeme] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('https://meme-api.com/gimme/FootballMemes')
      .then(res => {
        if (!res.ok) throw new Error('Não foi possível carregar o meme');
        return res.json();
      })
      .then(data => setMeme({ url: data.url, title: data.title }))
      .catch(() => setErro('Falha ao buscar meme.'));
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1>Bem-vindo à Plataforma Esportiva</h1>
      <p className="lead">
        Organize seus jogadores e quadras, agende partidas e acompanhe o futebol
        amador em um só lugar.
      </p>

      <div className="mt-4 mb-5">
        <Link to="/pessoas" className="btn btn-outline-secondary me-2">
          Pessoas
        </Link>
        <Link to="/avulsos" className="btn btn-outline-primary">
          Jogadores Avulsos
        </Link>
      </div>

      <h5>Para descontrair, um meme de futebol:</h5>
      {erro && <div className="alert alert-warning">{erro}</div>}

      {meme ? (
        <div className="card mx-auto" style={{ maxWidth: 400 }}>
          <img
            src={meme.url}
            alt={meme.title}
            className="card-img-top"
            style={{ objectFit: 'cover', height: 300 }}
          />
          <div className="card-body">
            <p className="card-text">
              <em>{meme.title}</em>
            </p>
            <button
              className="btn btn-sm btn-outline-info"
              onClick={() => window.location.reload()}
            >
              Novo Meme ⚽
            </button>
          </div>
        </div>
      ) : (
        !erro && <p>Carregando meme...</p>
      )}
    </div>
  );
}
