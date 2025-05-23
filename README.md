![CI](https://github.com/pHzeraGitHub/plataforma-interacao-esportiva/actions/workflows/ci-cd.yml/badge.svg)
# Plataforma de Interação Esportiva

**Projeto Integrado** | *Phillipe Martins da Silva*

Uma aplicação web full‑stack para conectar jogadores, times e quadras, permitindo reservas, cadastro de jogadores avulsos, agendamento de partidas, convites de árbitros e muito mais.

---

## 📁 Estrutura do Repositório

```
plataforma_interacao_esportiva_final/
├── backend/               # API Django + DRF
├── frontend/              # App React + Bootstrap
├── .github/workflows/     # CI/CD GitHub Actions
├── docker-compose.yml     # Orquestração de containers
└── README.md              # Este arquivo
```

---

## ⚙️ Ambiente de Desenvolvimento

### 1. Backend (Django + DRF)

```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\Activate.ps1
# macOS/Linux: source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# A API estará em http://localhost:8000/
```

#### Principais Endpoints

| Método | Rota                           | Descrição                          |
| ------ | ------------------------------ | ---------------------------------- |
| GET    | `/api/v2/`                     | Health check                       |
| GET    | `/api/v2/pessoas/`             | Listar/Cadastrar Pessoas           |
| GET    | `/api/v2/jogadores-avulsos/`   | Listar/Cadastrar Jogadores Avulsos |
| GET    | `/api/v2/sorteio-times/?qtd=N` | Sortear N pessoas em 2 times       |
| POST   | `/api/token/`                  | Autenticação (JWT)                 |

### 2. Frontend (React + Bootstrap)

```bash
cd frontend
npm install
npm start
# A aplicação estará em http://localhost:3000/
```

#### Variáveis de Ambiente (frontend/.env.local)

```dotenv
REACT_APP_API_URL=http://localhost:8000/api/v2
```

---

## 🚀 Deploy em Nuvem

### Backend

* **Railway:** `https://plataforma-interacao-esportiva-production.up.railway.app`

  * Health: `GET /` → `{ "status": "Backend OK" }`
  * API v2: `https://.../api/v2/pessoas/` retorna `[]` inicialmente.

### Frontend

* **Vercel:** `https://plataforma-interacao-esportiva-git-main-phzeragithubs-projects.vercel.app`

**Obs:** Em Settings → Environment Variables (Vercel), defina:

```
REACT_APP_API_URL=https://plataforma-interacao-esportiva-production.up.railway.app/api/v2
```

---

## 📦 CI/CD

Usamos **GitHub Actions** para rodar:

1. **backend**: testes unitários e migrações (`pytest`, `manage.py test`).
2. **frontend**: `npm run build`.

Badge (status):
![CI/CD Pipeline](https://github.com/pHzeraGitHub/plataforma-interacao-esportiva/actions/workflows/ci-cd.yml/badge.svg)

---

## 🎥 Vídeo de Apresentação

[Assista à demonstração completa no YouTube]([https://youtu.be/yU62Dab2eeY](https://youtu.be/wO73SKRzDDU))

---

## 📝 Changelog

* **✨** Cadastro de pessoas com `email` e `telefone`
* **✨** CRUD de jogadores avulsos com disponibilidade, dias da semana e horário
* **✨** Autenticação JWT (rotas protegidas)
* **✨** Sorteio de times no frontend (10 nomes ou seleção manual)
* **🔧** Ajustes de CORS e variáveis de ambiente

---

Qualquer dúvida, abra uma issue ou entre em contato. Aproveite! 🚀
