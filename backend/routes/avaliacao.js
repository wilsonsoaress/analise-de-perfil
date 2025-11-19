// backend/routes/avaliacao.js

const express = require('express');
const router = express.Router();
const Candidato = require('../models/Candidato'); // Importar modelos
const Avaliacao = require('../models/Avaliacao');
const { calcularScoresOcean } = require('../utils/calcularScoresOcean'); // Importar função de cálculo

// Rota de Submissão do Formulário
router.post('/submit', async (req, res) => {
    // 1. Recebe os dados do corpo da requisição
    const { nomeCompleto, email, cargoAplicado, respostas } = req.body;

    // 2. Validação inicial de dados (Obrigatório: 20 respostas)
    if (!respostas || respostas.length !== 20) {
        return res.status(400).json({ erro: 'O formulário deve conter exatamente 20 respostas.' });
    }

    try {
        // 3. Verifica se o e-mail já existe (para evitar duplicidade)
        const candidatoExistente = await Candidato.findOne({ email });
        if (candidatoExistente) {
             return res.status(409).json({ erro: 'Este e-mail já possui uma avaliação registrada.' });
        }

        // 4. Cálculo dos Scores OCEAN
        const scoresCalculados = calcularScoresOcean(respostas);

        // 5. Criação do novo Candidato no DB
        const novoCandidato = new Candidato({
            nomeCompleto,
            email,
            cargoAplicado
        });
        await novoCandidato.save();

        // 6. Criação da Avaliação linkada ao Candidato
        const novaAvaliacao = new Avaliacao({
            candidato: novoCandidato._id,
            respostas: respostas,
            scores: scoresCalculados
        });
        await novaAvaliacao.save();

        // 7. Atualiza o Candidato com a referência da Avaliação (Opcional, mas útil)
        novoCandidato.avaliacaoId = novaAvaliacao._id;
        await novoCandidato.save();


        // 8. Resposta de Sucesso (Envia o ID da avaliação para o Frontend)
        res.status(201).json({ 
            mensagem: "Avaliação submetida com sucesso!", 
            avaliacaoId: novaAvaliacao._id,
            scores: scoresCalculados // Útil para debug
        });

    } catch (err) {
        console.error("Erro na Rota POST /submit:", err);
        // Resposta de erro genérica
        res.status(500).json({ erro: 'Falha interna do servidor.', detalhes: err.message });
    }
});

module.exports = router;