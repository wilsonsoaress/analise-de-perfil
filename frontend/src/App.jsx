// frontend/src/App.jsx

import React from 'react';
import { FormularioProvider, useFormulario } from './context/FormularioContext';
// Importe o CardForm
import CardForm from './components/CardForm';
// Importe o ResultadoPerfil (Crie este arquivo se ainda não criou)
import ResultadoPerfil from './components/ResultadoPerfil';

// --- Lista de Perguntas (Conteúdo estático) ---
const QUESTIONS_CONTENT = {
    // ABERTURA (A)
    'A1': 'Eu me sinto energizado e vejo como uma oportunidade de aprendizado quando os procedimentos ou prioridades de trabalho mudam subitamente.',
    'A2': 'Gosto de passar tempo pensando em conceitos abstratos, filosofias complexas ou teorias não comprovadas.',
    'A3': 'Busco ativamente novos conhecimentos e habilidades (cursos, leituras, etc.) que não são estritamente exigidos pelo meu trabalho.',
    'A4': 'Prefiro me ater a métodos e rotinas de trabalho já testadas e comprovadas.', // [I]

    // CONSCIENCIOSIDADE (C)
    'C1': 'Minhas tarefas e projetos são sempre estruturados com antecedência e sigo um cronograma bem definido para garantir a entrega no prazo.',
    'C2': 'Prefiro antecipar problemas e buscar soluções por conta própria, em vez de esperar por instruções detalhadas sobre o que fazer.',
    'C3': 'Sinto-me mais motivado quando recebo metas claras e objetivas, e me dedico intensamente para superá-las.',
    'C4': 'Tenho a tendência de deixar tarefas menos prazerosas para o último minuto.', // [I]

    // EXTROVERSÃO (E)
    'E1': 'Gosto de ser o centro das atenções em reuniões ou eventos sociais.',
    'E2': 'Sou uma pessoa que inicia a conversa facilmente com estranhos e me expresso com energia.',
    'E3': 'Eu me sinto mais produtivo e energizado quando estou trabalhando ativamente em um ambiente de equipe movimentado.',
    'E4': 'Gosto de passar a maior parte do meu tempo de trabalho em solidão e silêncio, sem interrupções.', // [I]

    // AMABILIDADE (M)
    'M1': 'Consigo facilmente adaptar meu estilo de trabalho para colaborar de forma eficaz com pessoas que possuem visões diferentes.',
    'M2': 'Mantenho a calma e a cordialidade mesmo em conversas onde há forte discordância de ideias.',
    'M3': 'Tenho facilidade em expressar minha opinião ou discordância de forma clara e respeitosa, sem receio de confrontos construtivos.',
    'M4': 'Tenho dificuldade em perdoar e guardar rancor de colegas que me causaram problemas.', // [I]

    // NEUROTICISMO (N)
    'N1': 'Mantenho a calma e a clareza de pensamento mesmo em momentos de alto estresse ou prazos apertados.',
    'N2': 'Diante de um grande revés ou falha, busco rapidamente aprender com o erro e reinicio os esforços com energia renovada.',
    'N3': 'Eu geralmente me sinto bem-humorado, tranquilo e sem preocupações sobre o trabalho no dia a dia.',
    'N4': 'Frequentemente me sinto ansioso ou preocupado com a possibilidade de cometer erros, mesmo em tarefas simples.', // [I]
};
// ----------------------------------------------------------------------------------


// --- Componente principal que usa o contexto ---
function FormularioContainer() {
    const {
        candidatoInfo,
        setCandidatoInfo,
        currentStep,
        setCurrentStep,
        TOTAL_QUESTIONS,
        nextStep,
        prevStep,
        handleSubmit,
        QUESTION_IDS
    } = useFormulario();

    // Lógicas de Estado para controlar qual tela mostrar
    const isFirstStep = currentStep === 0;
    const isQuestionStep = currentStep >= 1 && currentStep <= TOTAL_QUESTIONS;
    const isResultStep = currentStep > TOTAL_QUESTIONS; // Se for maior que 20, mostra resultado

    const currentQuestionId = QUESTION_IDS[currentStep - 1];

    // Lógica para avançar do passo 0 (Informações Iniciais)
    const handleInitialSubmit = () => {
        if (!candidatoInfo.nomeCompleto || !candidatoInfo.email || !candidatoInfo.cargoAplicado) {
            alert('Por favor, preencha nome, email e cargo para iniciar.');
            return;
        }
        setCurrentStep(1); // Vai para a primeira pergunta (Step 1)
    };

    const handleCandidatoChange = (e) => {
        const { name, value } = e.target;
        setCandidatoInfo(prev => ({ ...prev, [name]: value }));
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div className="max-w-xl mx-auto p-6 md:p-10 bg-white shadow-2xl rounded-xl">

            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                {isResultStep ? 'Resultado da Avaliação' : 'Avaliação de Perfil OCEAN'}
            </h1>

            {/* BARRA DE PROGRESSO (Apenas durante as perguntas) */}
            {isQuestionStep && (
                 <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-2 text-center">
                        Questão <strong>{currentStep}</strong> de <strong>{TOTAL_QUESTIONS}</strong>
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${(currentStep / TOTAL_QUESTIONS) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* -------------------- STEP 0: INFORMAÇÕES BÁSICAS -------------------- */}
            {isFirstStep && (
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-indigo-700">1. Informações para Iniciar</h2>
                    <input
                        name="nomeCompleto"
                        value={candidatoInfo.nomeCompleto}
                        onChange={handleCandidatoChange}
                        placeholder="Nome Completo"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                        name="email"
                        value={candidatoInfo.email}
                        onChange={handleCandidatoChange}
                        placeholder="Email (Usado para salvar seu perfil)"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                     <input
                        name="cargoAplicado"
                        value={candidatoInfo.cargoAplicado}
                        onChange={handleCandidatoChange}
                        placeholder="Cargo Aplicado"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        onClick={handleInitialSubmit}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold"
                    >
                        Iniciar Avaliação &rarr;
                    </button>
                </div>
            )}


            {/* -------------------- STEPS 1-20: QUESTION CARDS -------------------- */}
            {isQuestionStep && (
                <>
                    <CardForm
                        id={currentQuestionId}
                        texto={QUESTIONS_CONTENT[currentQuestionId]}
                    />

                    {/* NAVEGAÇÃO */}
                    <div className="flex justify-between mt-8 pt-4 border-t">
                        <button
                            onClick={prevStep}
                            disabled={currentStep <= 1}
                            className={`px-6 py-2 rounded-lg transition ${
                                currentStep <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            &larr; Anterior
                        </button>

                        {(currentStep < TOTAL_QUESTIONS) ? (
                            <button
                                onClick={nextStep}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                            >
                                Próxima &rarr;
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                            >
                                Finalizar & Enviar
                            </button>
                        )}
                    </div>
                </>
            )}

            {/* -------------------- STEP FINAL: RESULTADO -------------------- */}
            {isResultStep && (
                <ResultadoPerfil />
            )}

        </div>
    );
}


// --- Componente Raiz da Aplicação ---
function App() {
    return (
        // O FormularioProvider envolve toda a aplicação
        <FormularioProvider>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
                <FormularioContainer />
            </div>
        </FormularioProvider>
    );
}

export default App;