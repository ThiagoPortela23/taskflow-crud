<h1 align="center">
  ✦ TaskFlow
</h1>

<p align="center">
  Gerenciador de tarefas com Kanban Board — React + Node.js + PostgreSQL
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-6-52B0E7?style=flat-square&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
</p>

---

## 📋 Sobre o Projeto

O **TaskFlow** é uma aplicação web fullstack de gerenciamento de tarefas com interface Kanban. Permite criar, editar, mover e excluir tarefas organizadas em três colunas: **Pendente**, **Em Andamento** e **Concluída**.

### Funcionalidades

- ✅ **Criar** tarefas com título, descrição, status e prioridade
- ✅ **Editar** qualquer campo da tarefa via modal
- ✅ **Mover** tarefas entre colunas com um clique
- ✅ **Excluir** tarefas com confirmação
- ✅ **Buscar** tarefas por título em tempo real
- ✅ **Badges** de prioridade: 🟢 Baixa / 🟡 Média / 🔴 Alta
- ✅ **Contador** de tarefas por status no header
- ✅ **Design** dark mode com glassmorphism e animações

---

## 🗂️ Estrutura do Repositório

```
taskflow-crud/
├── backend/                     # API REST — Node.js + Express + Sequelize
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # Conexão com o PostgreSQL via Sequelize
│   │   ├── models/
│   │   │   └── Tarefa.js        # Model com UUID, status e prioridade (ENUMs)
│   │   ├── routes/
│   │   │   └── tarefas.js       # Definição das rotas REST
│   │   └── controllers/
│   │       └── tarefaController.js  # Lógica CRUD completa
│   ├── app.js                   # Entry point — Express, CORS, sync do banco
│   ├── .env.example             # Modelo das variáveis de ambiente
│   └── package.json
│
├── frontend/                    # Interface — React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx  # Board com 3 colunas dinâmicas
│   │   │   ├── TaskCard.jsx     # Card individual com ações
│   │   │   └── TaskModal.jsx    # Modal criar/editar com validação
│   │   ├── services/
│   │   │   └── api.js           # Camada de comunicação com a API (axios)
│   │   ├── App.jsx              # Componente principal com estado global
│   │   └── App.css              # Estilos dark mode premium
│   ├── index.html
│   └── vite.config.js           # Proxy para o backend em :3001
│
├── .gitignore
└── README.md
```

---

## 🚀 Como Instalar e Rodar

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js 18+](https://nodejs.org/) — `node -v` para verificar
- [Git](https://git-scm.com/) — `git --version` para verificar
- [PostgreSQL 14+](https://www.postgresql.org/download/) — veja as instruções abaixo

---

### 1️⃣ Instalar o PostgreSQL

1. Acesse **https://www.postgresql.org/download/windows/**
2. Clique em **"Download the installer"** e baixe a versão mais recente para Windows x86-64
3. Execute o instalador e siga os passos:
   - Componentes: marque **PostgreSQL Server**, **pgAdmin 4** e **Command Line Tools**
   - **Defina uma senha** para o usuário `postgres` — guarde bem essa senha!
   - Porta: mantenha `5432`
   - Na tela final, pode **desmarcar** o Stack Builder e clicar em Finish
4. Verifique se o serviço está rodando:

```powershell
Get-Service -Name postgresql*
# Deve mostrar: Running
```

---

### 2️⃣ Criar o Banco de Dados

Abra o **pgAdmin 4** (instalado com o PostgreSQL):

1. Expanda **Servers → PostgreSQL** e insira sua senha
2. Clique com botão direito em **Databases → Create → Database**
3. No campo **Database**, escreva `tarefas_db` e clique em **Save**

Ou via linha de comando:

```powershell
psql -U postgres -c "CREATE DATABASE tarefas_db;"
# Informe a senha quando solicitado
```

---

### 3️⃣ Clonar o Repositório

```bash
git clone https://github.com/SEU_USUARIO/taskflow-crud.git
cd taskflow-crud
```

---

### 4️⃣ Configurar o Backend

```bash
cd backend
```

Copie o arquivo de exemplo e configure suas credenciais:

```bash
copy .env.example .env
```

Abra o arquivo `.env` e edite com sua senha do PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tarefas_db
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI   ← altere esta linha
PORT=3001
```

Instale as dependências:

```bash
npm install
```

---

### 5️⃣ Configurar o Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

---

### 6️⃣ Rodar a Aplicação

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

Saída esperada:
```
✅ Conexão com o PostgreSQL estabelecida com sucesso!
✅ Tabelas sincronizadas com sucesso!
🚀 Servidor rodando em http://localhost:3001
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

Saída esperada:
```
  VITE v8.x.x  ready in Xms
  ➜  Local:   http://localhost:5173/
```

Acesse **http://localhost:5173** no navegador. ✅

---

## 🔌 API REST

Base URL: `http://localhost:3001/api`

| Método   | Endpoint            | Descrição                          |
|----------|---------------------|------------------------------------|
| `GET`    | `/tarefas`          | Listar todas as tarefas            |
| `GET`    | `/tarefas?busca=x`  | Buscar tarefas por título          |
| `GET`    | `/tarefas/:id`      | Buscar tarefa por ID               |
| `POST`   | `/tarefas`          | Criar nova tarefa                  |
| `PUT`    | `/tarefas/:id`      | Atualizar tarefa                   |
| `DELETE` | `/tarefas/:id`      | Excluir tarefa                     |

### Exemplo de body (POST/PUT)

```json
{
  "titulo": "Estudar React",
  "descricao": "Revisar hooks e context API",
  "status": "em_andamento",
  "prioridade": "alta"
}
```

### Valores aceitos

| Campo       | Valores possíveis                            |
|-------------|----------------------------------------------|
| `status`    | `pendente` · `em_andamento` · `concluida`    |
| `prioridade`| `baixa` · `media` · `alta`                  |

---

## 🧰 Tecnologias Utilizadas

### Backend
| Tecnologia  | Versão | Função                              |
|-------------|--------|-------------------------------------|
| Node.js     | 24     | Runtime JavaScript                  |
| Express     | 4.x    | Framework web / roteamento          |
| Sequelize   | 6.x    | ORM para PostgreSQL                 |
| pg          | 8.x    | Driver nativo do PostgreSQL         |
| dotenv      | 16.x   | Variáveis de ambiente               |
| cors        | 2.x    | Cross-Origin Resource Sharing       |
| nodemon     | 3.x    | Hot-reload em desenvolvimento       |

### Frontend
| Tecnologia | Versão | Função                              |
|------------|--------|-------------------------------------|
| React      | 18     | Biblioteca de interface             |
| Vite       | 8.x    | Build tool e dev server             |
| Axios      | 1.x    | Requisições HTTP                    |
| CSS Puro   | —      | Estilização (dark mode + glassmorphism) |

---

## ⚠️ Variáveis de Ambiente

O arquivo `.env` **nunca é enviado ao repositório** (está no `.gitignore`).  
Use o `.env.example` como base ao clonar o projeto:

```bash
copy backend\.env.example backend\.env
# Edite o arquivo com suas credenciais
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.
