// backend/routes/avaliacao.js

const express = require('express');
const router = express.Router();
const Candidato = require('../models/Candidato');
const Avaliacao = require('../models/Avaliacao');
const { calcularScoresOcean } = require('../utils/calcularScoresOcean');

// --- DEFINIÇÕES DO SWAGGER (DOCUMENTAÇÃO) ---

/**
 * @swagger
 * components:
 * schemas:
 * Submissao:
 * type: object
 * required:
 * - nomeCompleto
 * - email
 * - cargoAplicado
 * - respostas
 * properties:
 * nomeCompleto:
 * type: string
 * description: Nome completo do candidato
 * email:
 * type: string
 * format: email
 * description: E-mail único do candidato
 * cargoAplicado:
 * type: string
 * description: Vaga para a qual está se candidatando
 * respostas:
 * type: array
 * description: Lista com exatamente 20 respostas
 * items:
 * type: object
 * properties:
 * idQuestao:
 * type: string
 * example: "A1"
 * pontuacao:
 * type: integer
 * minimum: 0
 * maximum: 4
 * example: 4
 */

/**
 * @swagger
 * /api/submit:
 * post:
 * summary: Submete uma nova avaliação e retorna o perfil calculado
 * tags: [Avaliação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Submissao'
 * responses:
 * 201:
 * description: Avaliação criada com sucesso
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * mensagem:
 * type: string
 * avaliacaoId:
 * type: string
 * scores:
 * type: object
 * properties:
 * abertura: { type: integer }
 * conscienciosidade: { type: integer }
 * extroversao: { type: integer }
 * amabilidade: { type: integer }
 * neuroticismo: { type: integer }
 * 400:
 * description: Erro de validação (ex: faltam respostas ou formato inválido)
 * 409:
 * description: Conflito - E-mail já cadastrado
 * 500:
 * description: Erro interno do servidor
 */

// --- ROTA DA API ---

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
            scores: scoresCalculados // Útil para debug e para o Frontend exibir o resultado
        });

    } catch (err) {
        console.error("Erro na Rota POST /submit:", err);
        // Resposta de erro genérica
        res.status(500).json({ erro: 'Falha interna do servidor.', detalhes: err.message });
    }
});

module.exports = router;