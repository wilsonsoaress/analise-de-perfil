// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Variáveis de Ambiente definidas no docker-compose.yml
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// MONGO_URI deve ser: mongodb://mongodb:27017/recruitmentDB

const app = express();

// Middleware básico
app.use(express.json());

// 1. Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');

    // Inicia o servidor Express somente após a conexão com o DB
    app.listen(PORT, () => {
      console.log(`🚀 Backend Server rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ ERRO ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

// 2. Rotas (Serão adicionadas mais tarde)
// app.use('/api', require('./routes/avaliacao'));

const avaliacaoRoutes = require('./routes/avaliacao');
app.use(cors());
app.use('/api', avaliacaoRoutes); // A rota será /api/submit