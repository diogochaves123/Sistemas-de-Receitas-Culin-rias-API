# 🍳 Sistema de Receitas Culinárias API

API RESTful completa desenvolvida em Node.js + Express.js para gerenciamento de receitas culinárias, com autenticação JWT, banco de dados PostgreSQL (NeonDB), ORM Sequelize, validações, testes automatizados e documentação Swagger.

## 📋 Índice

- [Introdução](#-introdução)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Configuração do Banco NeonDB](#-configuração-do-banco-neondb)
- [Acessar Swagger](#-acessar-swagger)
- [Rodar Testes](#-rodar-testes)
- [Deploy na Nuvem](#-deploy-na-nuvem)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Exemplos de Requisição](#-exemplos-de-requisição)
- [Endpoints da API](#-endpoints-da-api)

## 🎯 Introdução

Este projeto é uma API RESTful completa para um sistema de receitas culinárias, permitindo que usuários criem, gerenciem e avaliem receitas. A aplicação inclui:

- ✅ Autenticação JWT com bcrypt
- ✅ 5 entidades com relacionamentos complexos
- ✅ Validação de dados com express-validator
- ✅ Middlewares customizados (logger, requestId, auth, validation, errorHandler)
- ✅ Testes unitários e de integração com Jest
- ✅ Documentação Swagger completa
- ✅ Pronto para deploy no Render

## 🛠 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Sequelize** - ORM para PostgreSQL
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados
- **Swagger** - Documentação da API
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas:

```
┌─────────────────┐
│   Controllers   │  ← Recebem requisições e retornam respostas
├─────────────────┤
│    Services     │  ← Lógica de negócio
├─────────────────┤
│     Models      │  ← Modelos de dados (Sequelize)
├─────────────────┤
│   Middlewares   │  ← Interceptadores (auth, validation, logger, etc)
├─────────────────┤
│     Routes      │  ← Definição de rotas
└─────────────────┘
```

### Fluxo de Requisição

1. **Request** → Middleware de RequestId
2. **Logger** → Registra a requisição
3. **Routes** → Roteia para o controller correto
4. **Auth Middleware** → Valida token JWT (se necessário)
5. **Validation Middleware** → Valida dados de entrada
6. **Controller** → Processa requisição
7. **Service** → Executa lógica de negócio
8. **Model** → Interage com banco de dados
9. **Response** → Retorna resposta ao cliente
10. **Error Handler** → Trata erros (se houver)

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL ou conta no NeonDB
- npm ou yarn

### Passo a Passo

1. **Clone o repositório** (ou navegue até a pasta do projeto)

```bash
cd "Trabalho G2"
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto (veja seção [Variáveis de Ambiente](#-variáveis-de-ambiente))

4. **Execute as migrations**

```bash
npm run migrate
```

5. **Execute os seeders (opcional)**

```bash
npm run seed
```

6. **Inicie o servidor**

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (NeonDB)
DB_HOST=your-neondb-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_URL=postgresql://user:password@host:5432/database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=*

# API URL (para Swagger)
API_URL=http://localhost:3000
```

### Exemplo de `.env` para desenvolvimento local:

```env
PORT=3000
NODE_ENV=development
DB_URL=postgresql://usuario:senha@localhost:5432/receitas_db
JWT_SECRET=minha-chave-secreta-super-segura-123
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

## 🗄 Configuração do Banco NeonDB

### 1. Criar conta no NeonDB

1. Acesse [https://neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto

### 2. Obter String de Conexão

1. No dashboard do NeonDB, vá em **Connection Details**
2. Copie a **Connection String** (formato: `postgresql://user:password@host/database`)
3. Cole no arquivo `.env` como `DB_URL`

### 3. Executar Migrations

```bash
npm run migrate
```

Isso criará todas as tabelas necessárias no banco.

### 4. (Opcional) Popular com dados iniciais

```bash
npm run seed
```

## 📚 Acessar Swagger

Após iniciar o servidor, acesse a documentação Swagger em:

**http://localhost:3000/api-docs**

A documentação inclui:
- Todos os endpoints da API
- Parâmetros de entrada
- Exemplos de requisição e resposta
- Autenticação JWT
- Teste interativo dos endpoints

## 🧪 Rodar Testes

### Executar todos os testes

```bash
npm test
```

### Executar testes com coverage

```bash
npm test
# O coverage será exibido no terminal
```

### Executar testes em modo watch

```bash
npm run test:watch
```

### Estrutura de Testes

- **Testes Unitários**: `src/tests/unit/`
  - Testam funções e services isoladamente
  - Exemplos: `authService.test.js`, `recipeService.test.js`

- **Testes de Integração**: `src/tests/integration/`
  - Testam fluxos completos da API
  - Exemplos: `recipe.test.js`, `category.test.js`

## 🌐 Deploy na Nuvem

### Deploy no Render

1. **Criar conta no Render**
   - Acesse [https://render.com](https://render.com)
   - Crie uma conta gratuita

2. **Criar Web Service**
   - Clique em "New" → "Web Service"
   - Conecte seu repositório GitHub (ou faça deploy manual)

3. **Configurar Build e Start**
   - **Build Command**: `npm install && npm run migrate`
   - **Start Command**: `npm start`

4. **Configurar Variáveis de Ambiente**
   No painel do Render, adicione todas as variáveis do `.env`:
   - `DB_URL` (string de conexão do NeonDB)
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `NODE_ENV=production`
   - `PORT` (Render define automaticamente, mas você pode usar `PORT` no código)
   - `CORS_ORIGIN` (seu domínio frontend)
   - `API_URL` (URL do seu deploy no Render)

5. **Deploy**
   - Render fará o deploy automaticamente
   - Aguarde a conclusão e acesse a URL fornecida

### Link do Deploy

Após o deploy, seu link será algo como:
```
https://sistema-receitas-culinarias.onrender.com
```

Acesse a documentação Swagger em:
```
https://sistema-receitas-culinarias.onrender.com/api-docs
```

## 📁 Estrutura de Pastas

```
sistema-receitas-culinarias/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do Sequelize
│   ├── controllers/
│   │   ├── authController.js    # Autenticação
│   │   ├── recipeController.js  # Receitas
│   │   ├── categoryController.js
│   │   ├── ingredientController.js
│   │   └── ratingController.js
│   ├── docs/
│   │   └── swagger.js            # Configuração Swagger
│   ├── middlewares/
│   │   ├── auth.js              # Autenticação JWT
│   │   ├── errorHandler.js      # Tratamento de erros
│   │   ├── logger.js            # Log de requisições
│   │   ├── requestId.js         # ID único por requisição
│   │   └── validation.js        # Validação de dados
│   ├── migrations/
│   │   ├── 20240101000001-create-users.js
│   │   ├── 20240101000002-create-categories.js
│   │   ├── 20240101000003-create-ingredients.js
│   │   ├── 20240101000004-create-recipes.js
│   │   ├── 20240101000005-create-recipe-ingredients.js
│   │   └── 20240101000006-create-ratings.js
│   ├── models/
│   │   ├── index.js             # Configuração Sequelize
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   ├── Category.js
│   │   ├── Ingredient.js
│   │   └── Rating.js
│   ├── routes/
│   │   ├── index.js             # Rotas principais
│   │   ├── authRoutes.js
│   │   ├── recipeRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── ingredientRoutes.js
│   │   └── ratingRoutes.js
│   ├── seeders/
│   │   ├── 20240101000001-demo-categories.js
│   │   └── 20240101000002-demo-ingredients.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── recipeService.js
│   │   ├── categoryService.js
│   │   ├── ingredientService.js
│   │   └── ratingService.js
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── authService.test.js
│   │   │   └── recipeService.test.js
│   │   └── integration/
│   │       ├── recipe.test.js
│   │       └── category.test.js
│   ├── utils/
│   │   └── validators.js         # Validações express-validator
│   └── server.js                # Arquivo principal
├── .env                         # Variáveis de ambiente (não commitado)
├── .env.example                 # Exemplo de variáveis
├── .gitignore
├── .sequelizerc                 # Configuração Sequelize CLI
├── package.json
└── README.md
```

## 📝 Exemplos de Requisição

### 1. Registrar Usuário

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Fazer Login

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Criar Receita (Autenticado)

```bash
POST http://localhost:3000/api/recipes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Bolo de Chocolate",
  "description": "Delicioso bolo de chocolate caseiro",
  "instructions": "1. Misture os ingredientes secos\n2. Adicione os líquidos\n3. Asse por 45 minutos",
  "prepTime": 30,
  "cookTime": 45,
  "servings": 8,
  "difficulty": "Médio",
  "categoryId": "550e8400-e29b-41d4-a716-446655440001",
  "ingredients": [
    {
      "name": "Farinha de Trigo",
      "quantity": 2
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440002",
      "quantity": 1.5
    }
  ]
}
```

**Resposta:**
```json
{
  "message": "Receita criada com sucesso",
  "recipe": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "title": "Bolo de Chocolate",
    "description": "Delicioso bolo de chocolate caseiro",
    "instructions": "1. Misture os ingredientes secos\n2. Adicione os líquidos\n3. Asse por 45 minutos",
    "prepTime": 30,
    "cookTime": 45,
    "servings": 8,
    "difficulty": "Médio",
    "author": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "category": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Sobremesas"
    },
    "ingredients": [
      {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "name": "Farinha de Trigo",
        "unit": "xícara",
        "RecipeIngredients": {
          "quantity": 2
        }
      }
    ],
    "averageRating": 0
  }
}
```

### 4. Listar Receitas

```bash
GET http://localhost:3000/api/recipes?limit=10&offset=0&search=bolo
```

### 5. Avaliar Receita (Autenticado)

```bash
POST http://localhost:3000/api/ratings
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "recipeId": "770e8400-e29b-41d4-a716-446655440000",
  "score": 5,
  "comment": "Receita deliciosa! Muito fácil de fazer."
}
```

### 6. Criar Categoria

```bash
POST http://localhost:3000/api/categories
Content-Type: application/json

{
  "name": "Sobremesas",
  "description": "Receitas doces e sobremesas"
}
```

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Receitas
- `GET /api/recipes` - Listar receitas (com filtros)
- `GET /api/recipes/:id` - Buscar receita por ID
- `POST /api/recipes` - Criar receita (autenticado)
- `PUT /api/recipes/:id` - Atualizar receita (autenticado, apenas dono)
- `DELETE /api/recipes/:id` - Deletar receita (autenticado, apenas dono)

### Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Buscar categoria por ID
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Deletar categoria

### Ingredientes
- `GET /api/ingredients` - Listar ingredientes
- `GET /api/ingredients/:id` - Buscar ingrediente por ID
- `POST /api/ingredients` - Criar ingrediente
- `PUT /api/ingredients/:id` - Atualizar ingrediente
- `DELETE /api/ingredients/:id` - Deletar ingrediente

### Avaliações
- `GET /api/ratings` - Listar avaliações (com filtros)
- `GET /api/ratings/:id` - Buscar avaliação por ID
- `POST /api/ratings` - Criar/atualizar avaliação (autenticado)
- `PUT /api/ratings/:id` - Atualizar avaliação (autenticado, apenas dono)
- `DELETE /api/ratings/:id` - Deletar avaliação (autenticado, apenas dono)

### Health Check
- `GET /health` - Verificar status da API

## 🔐 Autenticação

A maioria dos endpoints requer autenticação via JWT. Para usar:

1. Faça login em `/api/auth/login`
2. Copie o `token` da resposta
3. Inclua no header: `Authorization: Bearer <token>`

## 📊 Relacionamentos

### User ↔ Recipe
- **1:N** - Um usuário pode ter várias receitas

### Recipe ↔ Ingredient
- **N:M** - Uma receita pode ter vários ingredientes, um ingrediente pode estar em várias receitas

### Recipe ↔ Category
- **N:1** - Várias receitas pertencem a uma categoria

### User ↔ Rating
- **1:N** - Um usuário pode fazer várias avaliações

### Recipe ↔ Rating
- **1:N** - Uma receita pode ter várias avaliações

## 🛡 Middlewares Implementados

1. **logger** - Registra todas as requisições com timestamp e duração
2. **requestId** - Gera ID único para cada requisição
3. **authenticate** - Valida token JWT
4. **validate** - Valida dados de entrada com express-validator
5. **errorHandler** - Tratamento padronizado de erros

## 🧪 Testes

- **Testes Unitários**: Testam services isoladamente
- **Testes de Integração**: Testam fluxos completos da API
- **Coverage**: Execute `npm test` para ver cobertura de código

## 📄 Licença

ISC

## 👨‍💻 Autores

EVERSON TIBOLLA BENEDETTI, 
EDUARDO AUGUSTO COLTRO, 
DIOGO VAZ DE CHAVES, 
GABRIEL VANZ DA SILVA, 
FERNANDO FERRARIN DA SILVA E
GABRIEL VINICIUS DE OLIVEIRA

---

**Desenvolvido com ❤️ usando Node.js + Express.js + PostgreSQL + Sequelize**

