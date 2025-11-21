# 🗄️ Como Configurar o Banco de Dados

## 🎯 Escolha uma opção:

### ⭐ Opção 1: SQLite (MAIS FÁCIL - Recomendado)

**Ideal para:** Desenvolvimento, testes, projetos pequenos

#### Passos:

1. **Instalar driver SQLite:**
```bash
npm install sqlite3
```

2. **Trocar configuração:**
```bash
# Renomear configuração atual (backup)
mv src/config/database.js src/config/database.postgres.backup.js

# Usar configuração SQLite
cp src/config/database.sqlite.js src/config/database.js
```

3. **Criar .env simples:**
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=sua-chave-secreta-123
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

4. **Executar migrations:**
```bash
npm run migrate
```

✅ **Pronto!** O arquivo `database.sqlite` será criado automaticamente na raiz do projeto.

---

### Opção 2: MySQL/MariaDB

**Ideal para:** Produção, quando já tem MySQL instalado

#### Passos:

1. **Instalar driver MySQL:**
```bash
npm install mysql2
```

2. **Trocar configuração:**
```bash
mv src/config/database.js src/config/database.postgres.backup.js
cp src/config/database.mysql.js src/config/database.js
```

3. **Instalar MySQL** (se não tiver):
- Windows: https://dev.mysql.com/downloads/installer/
- Mac: `brew install mysql`
- Linux: `sudo apt-get install mysql-server`

4. **Criar banco de dados:**
```sql
CREATE DATABASE receitas_db;
```

5. **Configurar .env:**
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=receitas_db
DB_USER=root
DB_PASSWORD=sua-senha-mysql
JWT_SECRET=sua-chave-secreta-123
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

6. **Executar migrations:**
```bash
npm run migrate
```

---

### Opção 3: PostgreSQL (Atual - Manter)

**Ideal para:** Quando já tem PostgreSQL ou quer usar serviços na nuvem

#### Opção 3A: Usar Supabase (Mais Fácil que NeonDB)

1. **Criar conta:** https://supabase.com
2. **Criar projeto**
3. **Copiar Connection String** (Settings → Database → Connection string)
4. **Configurar .env:**
```env
NODE_ENV=development
PORT=3000
DB_URL=postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres
JWT_SECRET=sua-chave-secreta-123
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
API_URL=http://localhost:3000
```

5. **Executar migrations:**
```bash
npm run migrate
```

#### Opção 3B: Usar Railway (Gratuito)

1. **Criar conta:** https://railway.app
2. **Criar PostgreSQL Database**
3. **Copiar Connection URL**
4. **Configurar .env** (igual ao Supabase)
5. **Executar migrations**

#### Opção 3C: Manter NeonDB

Siga as instruções do `CHECKLIST_FINAL.md`

---

## 🔄 Como Trocar de Banco Depois

Se já configurou um banco e quer trocar:

1. **Fazer backup dos dados** (se necessário)
2. **Trocar o arquivo de configuração** (`src/config/database.js`)
3. **Instalar o driver** do novo banco
4. **Atualizar .env**
5. **Executar migrations novamente:**
```bash
npm run migrate:undo:all  # Desfazer todas (cuidado!)
npm run migrate           # Criar novamente
```

---

## 📊 Comparação Rápida

| Banco | Dificuldade | Instalação | Gratuito | Produção |
|-------|-------------|------------|----------|----------|
| SQLite | ⭐ Muito Fácil | Não precisa | ✅ Sim | ⚠️ Limitado |
| MySQL | ⭐⭐ Fácil | Precisa instalar | ✅ Sim | ✅ Sim |
| PostgreSQL | ⭐⭐⭐ Média | Precisa ou nuvem | ✅ Sim | ✅ Sim |

---

## 💡 Recomendação

**Para desenvolvimento/testes:** Use **SQLite** (Opção 1)
**Para produção:** Use **PostgreSQL na nuvem** (Supabase ou Railway)

---

## ❓ Dúvidas?

Consulte:
- `GUIA_MIGRACAO_BANCO.md` - Guia detalhado
- `DATABASE_OPTIONS.md` - Comparação completa

