// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  // URL da API v2 (deve terminar em "/api/v2")
  const API_V2 = process.env.REACT_APP_API_URL;
  if (!API_V2) {
    throw new Error('REACT_APP_API_URL não está definida!');
  }

  // Base para autenticação: remove "/api/v2" de API_V2
  const AUTH_BASE = API_V2.replace(/\/api\/v2\/?$/, '');
  console.log('LOGIN usando AUTH_BASE:', AUTH_BASE);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch(`${AUTH_BASE}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Credenciais inválidas');

      // salva tokens e redireciona
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      navigate('/', { replace: true });
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Login</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}
