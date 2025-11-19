// backend/models/Avaliacao.js
const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
    // Referência ao candidato
    candidato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato',
        required: true
    },

    // CORREÇÃO AQUI: Definir explicitamente como Array de Objetos
    respostas: {
        type: [{
            idQuestao: { type: String, required: true },
            pontuacao: { type: Number, required: true }
        }],
        required: true,
        // Validador para garantir que temos exatamente 20 itens
        validate: [arrayLimit, '{PATH} deve ter exatamente 20 respostas']
    },

    // Scores calculados
    scores: {
        abertura: { type: Number, required: true },
        conscienciosidade: { type: Number, required: true },
        extroversao: { type: Number, required: true },
        amabilidade: { type: Number, required: true },
        neuroticismo: { type: Number, required: true }
    }
}, { timestamps: true });

// Função de validação do tamanho do array
function arrayLimit(val) {
    return val.length === 20;
}

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);