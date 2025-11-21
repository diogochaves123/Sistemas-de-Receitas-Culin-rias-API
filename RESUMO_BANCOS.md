# 🎯 Resumo: Qual Banco Usar?

## ⚡ Decisão Rápida

### Quer algo SIMPLES e RÁPIDO? 
👉 **Use SQLite** (Opção 1 abaixo)

### Quer algo PROFISSIONAL na nuvem?
👉 **Use PostgreSQL no Supabase** (Opção 3A abaixo)

### Já tem MySQL instalado?
👉 **Use MySQL** (Opção 2 abaixo)

---

## 🚀 Opção 1: SQLite (RECOMENDADO para começar)

### ✅ Vantagens:
- **Zero configuração** - não precisa instalar nada
- **Arquivo único** - fácil de gerenciar
- **Perfeito para desenvolvimento**

### 📝 Passos (2 minutos):

```bash
# 1. Instalar driver
npm install sqlite3

# 2. Trocar configuração
cp src/config/database.sqlite.js src/config/database.js

# 3. Criar .env (mínimo necessário)
echo "NODE_ENV=development
PORT=3000
JWT_SECRET=minha-chave-123
JWT_EXPIRES_IN=24h" > .env

# 4. Executar migrations
npm run migrate

# 5. Rodar servidor
npm run dev
```

✅ **Pronto!** Banco criado automaticamente em `database.sqlite`

---

## 🌐 Opção 2: PostgreSQL no Supabase (RECOMENDADO para produção)

### ✅ Vantagens:
- **Gratuito** e fácil
- **Interface web** para ver dados
- **Pronto para produção**

### 📝 Passos:

1. Criar conta: https://supabase.com
2. Criar projeto
3. Copiar Connection String (Settings → Database)
4. Colar no `.env`:
```env
DB_URL=postgresql://postgres:[SENHA]@db.xxx.supabase.co:5432/postgres
```
5. `npm run migrate`

---

## 📋 Opção 3: MySQL Local

### 📝 Passos:

```bash
# 1. Instalar driver
npm install mysql2

# 2. Trocar configuração
cp src/config/database.mysql.js src/config/database.js

# 3. Instalar MySQL (se não tiver)
# Windows: baixar do site oficial
# Mac: brew install mysql
# Linux: sudo apt install mysql-server

# 4. Criar banco
mysql -u root -p
CREATE DATABASE receitas_db;

# 5. Configurar .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=receitas_db
DB_USER=root
DB_PASSWORD=sua-senha

# 6. Executar migrations
npm run migrate
```

---

## 🔄 Já configurou um banco? Quer trocar?

1. Trocar `src/config/database.js` pelo arquivo do novo banco
2. Instalar driver do novo banco (`sqlite3` ou `mysql2`)
3. Atualizar `.env`
4. `npm run migrate`

---

## 📚 Arquivos de Ajuda

- `CONFIGURAR_BANCO.md` - Guia completo passo a passo
- `GUIA_MIGRACAO_BANCO.md` - Detalhes técnicos
- `DATABASE_OPTIONS.md` - Comparação completa

---

## 💡 Minha Recomendação

**Para o trabalho acadêmico:**
👉 **SQLite** - Mais simples, funciona perfeitamente, não precisa configurar servidor

**Para produção/deploy:**
👉 **PostgreSQL no Supabase** - Gratuito, profissional, fácil de usar

