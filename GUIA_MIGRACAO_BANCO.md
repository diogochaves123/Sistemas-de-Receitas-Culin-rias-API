# 🔄 Guia de Migração de Banco de Dados

## Opção 1: SQLite (Mais Simples) ⭐ RECOMENDADO

### Passo 1: Instalar Driver SQLite
```bash
npm install sqlite3
```

### Passo 2: Atualizar package.json
Adicione `sqlite3` nas dependências (já está no comando acima).

### Passo 3: Trocar Configuração
Renomeie ou substitua o arquivo:
```bash
# Backup da configuração atual
mv src/config/database.js src/config/database.postgres.js

# Usar configuração SQLite
mv src/config/database.sqlite.js src/config/database.js
```

### Passo 4: Adaptar Migrations para SQLite

SQLite não suporta:
- UUID nativo (vamos usar STRING)
- ENUM nativo (vamos usar VARCHAR)

**Solução:** Vou criar migrations adaptadas para SQLite.

### Passo 5: Adaptar Código

No arquivo `src/services/recipeService.js` e `src/services/ingredientService.js`, troque:
- `Op.iLike` → `Op.like` (SQLite não tem iLike, mas podemos usar função)

### Passo 6: Configurar .env
```env
NODE_ENV=development
# SQLite não precisa de DB_URL, DB_HOST, etc
```

### Passo 7: Executar Migrations
```bash
npm run migrate
```

Isso criará o arquivo `database.sqlite` na raiz do projeto.

---

## Opção 2: MySQL/MariaDB

### Passo 1: Instalar Driver MySQL
```bash
npm install mysql2
```

### Passo 2: Trocar Configuração
```bash
mv src/config/database.js src/config/database.postgres.js
mv src/config/database.mysql.js src/config/database.js
```

### Passo 3: Adaptar Migrations

MySQL não suporta:
- UUID nativo (vamos usar CHAR(36) ou VARCHAR(36))
- ENUM funciona, mas vamos manter

### Passo 4: Adaptar Código

Troque `Op.iLike` por `Op.like` (MySQL tem LOWER() para case-insensitive).

### Passo 5: Configurar .env
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=receitas_db
DB_USER=root
DB_PASSWORD=sua-senha
NODE_ENV=development
```

### Passo 6: Criar Banco de Dados
```sql
CREATE DATABASE receitas_db;
```

### Passo 7: Executar Migrations
```bash
npm run migrate
```

---

## Opção 3: Manter PostgreSQL (Atual)

Se quiser manter PostgreSQL mas usar outro provedor:

### Alternativas ao NeonDB:
- **Supabase** (https://supabase.com) - Gratuito, muito fácil
- **Railway** (https://railway.app) - Gratuito, fácil
- **ElephantSQL** (https://www.elephantsql.com) - Gratuito limitado
- **Render** (https://render.com) - Gratuito com limitações

Basta trocar a `DB_URL` no `.env`!

---

## 🔧 Adaptações Necessárias no Código

### Para SQLite e MySQL:

1. **Trocar UUID por STRING** (opcional, mas recomendado para compatibilidade)
2. **Trocar Op.iLike por Op.like** (já vou fazer isso)
3. **ENUM pode ser mantido** (Sequelize adapta)

Vou criar versões adaptadas dos arquivos que precisam mudança.

