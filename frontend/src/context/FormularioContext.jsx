import React, { createContext, useState, useContext } from 'react';
import { submitAvaliacao } from '../services/api';

// --- 1. Definições de Estrutura ---

// Define o mapeamento das 20 questões (IDs A1, C1, etc.)
const QUESTION_IDS = [
    'A1', 'A2', 'A3', 'A4',
    'C1', 'C2', 'C3', 'C4',
    'E1', 'E2', 'E3', 'E4',
    'M1', 'M2', 'M3', 'M4',
    'N1', 'N2', 'N3', 'N4'
];
const TOTAL_QUESTIONS = QUESTION_IDS.length;


// Cria o Contexto
const FormularioContext = createContext();


// --- 2. Hook Customizado ---

export const useFormulario = () => useContext(FormularioContext);


// --- 3. Provider do Contexto ---

export const FormularioProvider = ({ children }) => {

    // Estado para informações básicas do candidato
    const [candidatoInfo, setCandidatoInfo] = useState({
        nomeCompleto: '',
        email: '',
        cargoAplicado: '',
        telefone: ''
    });

    // Estado para armazenar as 20 respostas
    const [respostas, setRespostas] = useState(() =>
        QUESTION_IDS.map(idQuestao => ({
            idQuestao,
            pontuacao: -1, // -1 indica que a pergunta não foi respondida
        }))
    );

    // Estado para controlar a navegação dos cards
    const [currentStep, setCurrentStep] = useState(0); // 0 = Info, 1-20 = Perguntas, 21 = Resultado

    // NOVO: Estado para armazenar o resultado vindo da API
    const [resultadoPerfil, setResultadoPerfil] = useState(null);


    // --- FUNÇÕES DE LÓGICA E NAVEGAÇÃO ---

    /**
     * Atualiza a resposta (pontuação) de uma pergunta específica.
     */
    const updateResposta = (idQuestao, pontuacao) => {
        setRespostas(prevRespostas =>
            prevRespostas.map(resp =>
                resp.idQuestao === idQuestao ? { ...resp, pontuacao } : resp
            )
        );
    };

    /**
     * Navega para o próximo card, se a resposta atual for válida.
     */
    const nextStep = () => {
        // currentStep - 1, pois currentStep 1 se refere ao QUESTION_IDS[0]
        const currentQuestionId = QUESTION_IDS[currentStep - 1];
        const currentAnswer = respostas.find(r => r.idQuestao === currentQuestionId);

        // A navegação só avança se a resposta for válida
        if (currentAnswer && currentAnswer.pontuacao !== -1) {
            if (currentStep < TOTAL_QUESTIONS) {
                setCurrentStep(prevStep => prevStep + 1);
            }
        } else {
            alert('Por favor, selecione uma opção antes de avançar.');
        }
    };

    /**
     * Navega para o card anterior.
     */
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prevStep => prevStep - 1);
        } else if (currentStep === 1) {
             setCurrentStep(0); // Volta para a tela de Informações Iniciais
        }
    };

    /**
     * Monta o objeto final e submete à API.
     */
    const handleSubmit = async () => {
        // 1. Validação final (embora o UI geralmente previna isso)
        if (!candidatoInfo.nomeCompleto || !candidatoInfo.email) {
            alert('Preencha as informações básicas.');
            return;
        }

        const naoRespondidas = respostas.filter(r => r.pontuacao === -1);
        if (naoRespondidas.length > 0) {
            alert(`Faltam ${naoRespondidas.length} perguntas para responder!`);
            return;
        }

        // 2. Monta o objeto final para a API
        const submissionData = {
            ...candidatoInfo,
            respostas: respostas.map(({ idQuestao, pontuacao }) => ({ idQuestao, pontuacao }))
        };

        // 3. Envio REAL para a API
        try {
           const response = await submitAvaliacao(submissionData);

           // Salva os scores retornados pelo backend no estado
           setResultadoPerfil(response.scores);

           // Avança para a tela de resultado (TOTAL_QUESTIONS + 1)
           setCurrentStep(TOTAL_QUESTIONS + 1);

        } catch (error) {
           console.error("Erro na submissão:", error);
           alert('Falha no envio: ' + error.message);
        }
    };

    /**
     * Reinicia o formulário para um novo teste.
     */
    const resetForm = () => {
        setResultadoPerfil(null);
        setCurrentStep(0);
        setCandidatoInfo({ nomeCompleto: '', email: '', cargoAplicado: '', telefone: '' });
        setRespostas(QUESTION_IDS.map(id => ({ idQuestao: id, pontuacao: -1 })));
    };


    // --- 4. Objeto de Contexto ---

    const contextValue = {
        // Estados
        candidatoInfo,
        respostas,
        currentStep,
        resultadoPerfil, // Exportado para ser usado no ResultadoPerfil.jsx
        TOTAL_QUESTIONS,
        QUESTION_IDS,

        // Funções
        setCandidatoInfo,
        setCurrentStep,
        updateResposta,
        nextStep,
        prevStep,
        handleSubmit,
        resetForm, // Exportado para o botão "Realizar Novo Teste"
    };

    return (
        <FormularioContext.Provider value={contextValue}>
            {children}
        </FormularioContext.Provider>
    );
};