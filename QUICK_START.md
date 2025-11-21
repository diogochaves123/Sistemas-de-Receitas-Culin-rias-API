# 🚀 Quick Start Guide

## Instalação Rápida

1. **Instalar dependências**
```bash
npm install
```

2. **Configurar variáveis de ambiente**
```bash
# Copie o arquivo env.example para .env
cp env.example .env

# Edite o .env com suas credenciais do NeonDB
```

3. **Executar migrations**
```bash
npm run migrate
```

4. **Executar seeders (opcional)**
```bash
npm run seed
```

5. **Iniciar servidor**
```bash
npm run dev
```

## Acessar Swagger

Após iniciar o servidor:
```
http://localhost:3000/api-docs
```

## Testar API

### 1. Registrar usuário
```bash
POST http://localhost:3000/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

### 2. Fazer login
```bash
POST http://localhost:3000/api/auth/login
{
  "email": "test@example.com",
  "password": "test123"
}
```

### 3. Criar receita (use o token do login)
```bash
POST http://localhost:3000/api/recipes
Authorization: Bearer <seu-token>
{
  "title": "Bolo de Chocolate",
  "instructions": "Misture tudo e asse",
  "prepTime": 30,
  "cookTime": 45,
  "servings": 8,
  "categoryId": "<id-da-categoria>"
}
```

## Rodar Testes

```bash
npm test
```

## Comandos Úteis

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm start` - Inicia servidor em modo produção
- `npm test` - Executa testes
- `npm run migrate` - Executa migrations
- `npm run seed` - Executa seeders

