# ✅ Checklist Final - Sistema de Receitas Culinárias

## 📋 O que já está pronto:
- ✅ Estrutura completa do projeto
- ✅ 5 entidades com relacionamentos
- ✅ Middlewares (logger, requestId, auth, validation, errorHandler)
- ✅ Autenticação JWT
- ✅ Validações com express-validator
- ✅ Controllers, Services e Routes
- ✅ Migrations do Sequelize
- ✅ Seeders iniciais
- ✅ Testes Jest (unitários e integração)
- ✅ Documentação Swagger
- ✅ README completo
- ✅ Configuração para deploy
- ✅ Suporte a múltiplos bancos de dados (SQLite, MySQL, PostgreSQL)

---

## 🔧 O que você precisa fazer AGORA:

### 1. Instalar Dependências
```bash
npm install
```

---

### 2. Configurar Banco de Dados

**ESCOLHA UMA OPÇÃO:** (Recomendamos SQLite para começar rápido!)

#### ⭐ OPÇÃO A: SQLite (MAIS FÁCIL - Recomendado)

**Ideal para:** Desenvolvimento, testes, começar rápido

**Passos:**

1. **Instalar driver SQLite:**
```bash
npm install sqlite3
```

2. **Trocar configuração:**
```bash
# Windows (PowerShell)
Copy-Item src\config\database.sqlite.js src\config\database.js

# Linux/Mac
cp src/config/database.sqlite.js src/config/database.js
```

3. **Criar arquivo .env:**
```bash
# Copie o arquivo de exemplo
cp env.example .env
```

4. **Editar .env com este conteúdo mínimo:**
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=uma-chave-secreta-super-segura-123456
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

5. **Executar migrations:**
```bash
npm run migrate
```
✅ O arquivo `database.sqlite` será criado automaticamente!

---

#### OPÇÃO B: PostgreSQL no Supabase (Recomendado para Produção)

**Ideal para:** Deploy, produção, quando precisa de banco na nuvem

**Passos:**

1. **Criar conta no Supabase:**
   - Acesse: https://supabase.com
   - Crie uma conta gratuita
   - Crie um novo projeto

2. **Obter String de Conexão:**
   - No dashboard do Supabase, vá em **Settings** → **Database**
   - Role até **Connection string** → **URI**
   - Copie a string completa
   - Exemplo: `postgresql://postgres:[SENHA]@db.xxx.supabase.co:5432/postgres`

3. **Criar arquivo .env:**
```bash
cp env.example .env
```

4. **Editar .env:**
```env
NODE_ENV=development
PORT=3000
DB_URL=postgresql://postgres:[SUA-SENHA]@db.xxx.supabase.co:5432/postgres
JWT_SECRET=uma-chave-secreta-super-segura-123456
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

5. **Executar migrations:**
```bash
npm run migrate
```

---

#### OPÇÃO C: PostgreSQL no NeonDB

**Passos:**

1. **Criar conta no NeonDB:**
   - Acesse: https://neon.tech
   - Crie uma conta gratuita
   - Crie um novo projeto

2. **Obter String de Conexão:**
   - No dashboard do NeonDB, vá em **Connection Details**
   - Copie a **Connection String** completa
   - Exemplo: `postgresql://user:password@host/database?sslmode=require`

3. **Criar arquivo .env:**
```bash
cp env.example .env
```

4. **Editar .env:**
```env
NODE_ENV=development
PORT=3000
DB_URL=postgresql://seu-usuario:sua-senha@seu-host/seu-database?sslmode=require
JWT_SECRET=uma-chave-secreta-super-segura-123456
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

5. **Executar migrations:**
```bash
npm run migrate
```

---

#### OPÇÃO D: MySQL/MariaDB

**Passos:**

1. **Instalar driver MySQL:**
```bash
npm install mysql2
```

2. **Trocar configuração:**
```bash
# Windows (PowerShell)
Copy-Item src\config\database.mysql.js src\config\database.js

# Linux/Mac
cp src/config/database.mysql.js src/config/database.js
```

3. **Instalar MySQL** (se não tiver):
   - Windows: https://dev.mysql.com/downloads/installer/
   - Mac: `brew install mysql`
   - Linux: `sudo apt-get install mysql-server`

4. **Criar banco de dados:**
```sql
mysql -u root -p
CREATE DATABASE receitas_db;
EXIT;
```

5. **Criar arquivo .env:**
```bash
cp env.example .env
```

6. **Editar .env:**
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=receitas_db
DB_USER=root
DB_PASSWORD=sua-senha-mysql
JWT_SECRET=uma-chave-secreta-super-segura-123456
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

7. **Executar migrations:**
```bash
npm run migrate
```

---

### 3. Executar Seeders (Opcional mas Recomendado)

Isso populará o banco com categorias e ingredientes iniciais:

```bash
npm run seed
```

---

### 4. Testar Localmente

#### Iniciar o servidor:
```bash
npm run dev
```

#### Verificar se está funcionando:
- Acesse: http://localhost:3000/health
- Deve retornar: `{"status":"OK","timestamp":"..."}`

#### Acessar Swagger:
- Acesse: http://localhost:3000/api-docs
- Deve abrir a documentação interativa

---

### 5. Testar a API

#### Teste 1: Registrar usuário
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

#### Teste 2: Fazer login
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```
**⚠️ IMPORTANTE: Copie o token retornado! Você vai precisar dele.**

#### Teste 3: Criar categoria
```bash
POST http://localhost:3000/api/categories
Content-Type: application/json

{
  "name": "Sobremesas",
  "description": "Receitas doces"
}
```
**⚠️ IMPORTANTE: Copie o ID da categoria retornado!**

#### Teste 4: Criar receita (use o token do login)
```bash
POST http://localhost:3000/api/recipes
Authorization: Bearer <cole-o-token-aqui>
Content-Type: application/json

{
  "title": "Bolo de Chocolate",
  "description": "Delicioso bolo caseiro",
  "instructions": "1. Misture os ingredientes\n2. Asse por 45 minutos",
  "prepTime": 30,
  "cookTime": 45,
  "servings": 8,
  "difficulty": "Médio",
  "categoryId": "<cole-o-id-da-categoria-aqui>"
}
```

---

### 6. Executar Testes

```bash
npm test
```

Todos os testes devem passar. Se algum falhar, verifique se:
- O banco de dados está configurado corretamente
- As migrations foram executadas
- O arquivo `.env` está correto

---

### 7. Preparar para Deploy no Render (Opcional)

#### Passo 1: Criar conta no Render
- Acesse: https://render.com
- Crie uma conta gratuita (pode usar GitHub)

#### Passo 2: Criar Web Service
- Clique em "New" → "Web Service"
- Conecte seu repositório (ou faça upload manual)

#### Passo 3: Configurar Build
- **Build Command**: `npm install && npm run migrate`
- **Start Command**: `npm start`

#### Passo 4: Configurar Variáveis de Ambiente no Render
Adicione todas estas variáveis no painel do Render:
```
NODE_ENV=production
DB_URL=<sua-string-de-conexao-do-banco>
JWT_SECRET=<sua-chave-secreta>
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=https://seu-app.onrender.com
PORT=<deixe-vazio-ou-use-a-variavel-do-render>
```

**⚠️ IMPORTANTE:** Se usar SQLite, não funciona bem no Render. Use PostgreSQL (Supabase ou NeonDB) para deploy.

#### Passo 5: Deploy
- Render fará o deploy automaticamente
- Aguarde a conclusão
- Acesse: `https://seu-app.onrender.com/api-docs`

---

### 8. Atualizar README com Link do Deploy
Após o deploy, atualize o README.md com o link real do seu deploy.

---

## 🎯 Resumo dos Comandos Essenciais

```bash
# 1. Instalar dependências
npm install

# 2. Escolher banco e configurar .env (veja seção 2 acima)

# 3. Executar migrations
npm run migrate

# 4. Executar seeders (opcional)
npm run seed

# 5. Rodar servidor
npm run dev

# 6. Executar testes
npm test
```

---

## ⚠️ Problemas Comuns e Soluções

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Database connection failed"
- Verifique se o `.env` está configurado corretamente
- Verifique se a string de conexão está correta
- Se usar PostgreSQL na nuvem, certifique-se de que o banco está ativo
- Se usar SQLite, verifique se tem permissão para criar arquivos

### Erro: "Table doesn't exist"
```bash
npm run migrate
```

### Erro nas migrations
```bash
# Desfazer última migration
npm run migrate:undo

# Tentar novamente
npm run migrate
```

### Erro: "Dialect needs to be explicitly supplied"
- Verifique se trocou o arquivo `src/config/database.js` corretamente
- Se usar SQLite: `cp src/config/database.sqlite.js src/config/database.js`
- Se usar MySQL: `cp src/config/database.mysql.js src/config/database.js`
- Se usar PostgreSQL: mantenha o arquivo original ou use `cp src/config/database.postgres.backup.js src/config/database.js`

### SQLite: "database.sqlite não encontrado"
- Execute `npm run migrate` novamente
- Verifique se tem permissão de escrita na pasta do projeto

---

## 📝 Checklist Final de Entrega

Antes de entregar, verifique:

- [ ] Dependências instaladas (`npm install`)
- [ ] Banco de dados configurado (escolheu uma opção da seção 2)
- [ ] Arquivo `.env` criado e configurado (não commitar!)
- [ ] Migrations executadas com sucesso (`npm run migrate`)
- [ ] Projeto roda localmente sem erros (`npm run dev`)
- [ ] Swagger está acessível e funcionando (http://localhost:3000/api-docs)
- [ ] Testes passam (`npm test`)
- [ ] Consegue criar usuário, fazer login e criar receita (testes manuais)
- [ ] README.md completo e atualizado
- [ ] Deploy no Render funcionando (se aplicável)
- [ ] Link do deploy atualizado no README (se aplicável)

---

## 📚 Arquivos de Ajuda Adicionais

Se tiver dúvidas sobre qual banco usar ou como configurar:

- `RESUMO_BANCOS.md` - Guia rápido de decisão
- `CONFIGURAR_BANCO.md` - Passo a passo detalhado de cada banco
- `GUIA_MIGRACAO_BANCO.md` - Detalhes técnicos
- `QUICK_START.md` - Início rápido
- `README.md` - Documentação completa

---

## 🎉 Pronto!

Se todos os itens acima estão funcionando, seu trabalho está completo e pronto para entrega!

**Dúvidas?** Consulte os arquivos de ajuda ou verifique se seguiu todos os passos da seção 2 (Configurar Banco de Dados).
