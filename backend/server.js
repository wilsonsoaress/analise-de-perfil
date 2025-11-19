// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// 1. IMPORTAR SWAGGER (Bibliotecas de Documentação)
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Variáveis de Ambiente
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// --- MIDDLEWARES GERAIS ---
app.use(express.json()); // Permite receber JSON no body
app.use(cors());         // Habilita CORS para todas as rotas (Frontend 3000 -> Backend 5000)

// --- CONFIGURAÇÃO DO SWAGGER ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Avaliação OCEAN',
            version: '1.0.0',
            description: 'API para recebimento de respostas e cálculo de perfil comportamental.',
            contact: {
                name: 'Equipe de Desenvolvimento',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Servidor Local (Docker)',
            },
        ],
    },
    // Caminho onde o Swagger vai procurar as anotações "@swagger"
    apis: ['./routes/*.js'],
};

// Inicializa a documentação
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Rota da Documentação (Acesse em /api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// --- ROTAS DA API ---
const avaliacaoRoutes = require('./routes/avaliacao');
app.use('/api', avaliacaoRoutes); // Prefixo /api para todas as rotas de avaliação


// --- CONEXÃO COM O MONGODB E INICIALIZAÇÃO ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');

    // Inicia o servidor somente após conectar ao banco
    app.listen(PORT, () => {
      console.log(`🚀 Backend Server rodando na porta ${PORT}`);
      console.log(`📄 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ ERRO ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });