![CI](https://github.com/SEU-USUARIO/plataforma-interacao-esportiva/actions/workflows/ci-cd.yml/badge.svg)
# Plataforma de Interação Esportiva

Projeto Integrado | Phillipe Martins da Silva

## Estrutura

```
/plataforma_interacao_esportiva_final
├── backend
├── frontend
├── .github/workflows
├── docker-compose.yml
└── README.md
```

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: .\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API endpoints:
- `/` → health check
- `/api/v2/jogadores-avulsos/`

## Frontend

```bash
cd frontend
npm install
npm start
```

Access `http://localhost:3000/avulsos`

