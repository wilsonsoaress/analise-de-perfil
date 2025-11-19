// backend/utils/calcularScoresOcean.js

/**
 * Mapeamento das questões que precisam ter a pontuação invertida (4-0)
 * Os IDs [A4, C4, E4, M4, N4] foram definidos no planejamento.
 */
const REVERSE_SCORES = ['A4', 'C4', 'E4', 'M4', 'N4'];

/**
 * Mapeamento da primeira letra do ID para a chave de score no objeto final.
 */
const DIMENSION_MAP = {
    'A': 'abertura',
    'C': 'conscienciosidade',
    'E': 'extroversao',
    'M': 'amabilidade',
    'N': 'neuroticismo' // Maior score = Menor Neuroticismo / Maior Estabilidade
};

function calcularScoresOcean(respostasBrutas) {
    // Inicializa o objeto de scores com todas as dimensões zeradas
    const scores = {
        abertura: 0,
        conscienciosidade: 0,
        extroversao: 0,
        amabilidade: 0,
        neuroticismo: 0
    };

    respostasBrutas.forEach(resposta => {
        const { idQuestao, pontuacao } = resposta;
        
        // Determina a dimensão com base na primeira letra (A, C, E, M, N)
        const dimensaoLetra = idQuestao.charAt(0); 
        const chaveScore = DIMENSION_MAP[dimensaoLetra];

        if (chaveScore) {
            let pontuacaoFinal = pontuacao;

            // Aplica a Lógica de Pontuação Invertida (Reverse Scoring)
            if (REVERSE_SCORES.includes(idQuestao)) {
                // Cálculo da Inversão: 4 (max) - Pontuação Bruta
                pontuacaoFinal = 4 - pontuacao;
            }

            // Acumula o score na dimensão correta
            scores[chaveScore] += pontuacaoFinal;
        }
    });

    return scores;
}

module.exports = { calcularScoresOcean };