#!/bin/bash

echo "🚀 Configurando projeto Sistema de Receitas Culinárias..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Copiando env.example para .env..."
    cp env.example .env
    echo "✅ Por favor, configure as variáveis de ambiente no arquivo .env"
fi

# Executar migrations
echo "🗄️  Executando migrations..."
npm run migrate

# Executar seeders (opcional)
read -p "Deseja executar os seeders? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "🌱 Executando seeders..."
    npm run seed
fi

echo "✅ Configuração concluída!"
echo "🚀 Execute 'npm run dev' para iniciar o servidor"

