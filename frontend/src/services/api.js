import axios from 'axios';

// --------------------------------------------------------
// 1. CONFIGURAÇÃO BASE DO AXIOS
// --------------------------------------------------------

// A URL da API é definida como uma variável de ambiente no docker-compose.yml
// No desenvolvimento, será 'http://localhost:5000/api'
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Opcional: Aumentar o timeout para conexões lentas
    timeout: 10000,
});


// --------------------------------------------------------
// 2. FUNÇÃO DE SUBMISSÃO DO FORMULÁRIO
// --------------------------------------------------------

/**
 * Envia os dados completos do formulário (info do candidato + respostas) para o Backend.
 * O Backend calculará os scores OCEAN e salvará no MongoDB.
 * * @param {object} submissionData - Objeto contendo nomeCompleto, email, cargoAplicado e respostas.
 * @returns {Promise<object>} Objeto de resposta da API com a avaliaçãoId.
 */
export const submitAvaliacao = async (submissionData) => {
    try {
        const response = await api.post('/submit', submissionData);

        // A API de Backend deve retornar status 201 (Created) e o ID da avaliação
        return response.data;

    } catch (error) {
        // Trata erros de requisição, falha de conexão ou erros de validação do Backend
        let errorMessage = 'Erro desconhecido na submissão.';

        if (error.response) {
            // Erros que vêm do servidor (4xx, 5xx)
            if (error.response.data && error.response.data.erro) {
                errorMessage = error.response.data.erro; // Mensagem de erro personalizada do backend
            } else {
                errorMessage = `Erro do servidor: ${error.response.status} - ${error.response.statusText}`;
            }
        } else if (error.request) {
            // Falha de conexão
            errorMessage = 'Não foi possível conectar ao servidor (Backend offline ou CORS não configurado).';
        }

        // Lança o erro para ser tratado pelo handleSubmit no FormularioContext
        throw new Error(errorMessage);
    }
};

// Se for necessário, exporte a instância base do Axios
export default api;