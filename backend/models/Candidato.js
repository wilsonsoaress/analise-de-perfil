// backend/models/Candidato.js

const mongoose = require('mongoose');

const CandidatoSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // A avaliação será ligada a este candidato por referência
    avaliacaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Avaliacao' }
}, { timestamps: true });

module.exports = mongoose.model('Candidato', CandidatoSchema);