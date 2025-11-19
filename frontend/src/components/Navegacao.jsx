import React from 'react';
import { useFormulario } from '../context/FormularioContext';

/**
 * Componente que renderiza os botões de navegação (Anterior, Próxima, Enviar).
 */
const Navegacao = () => {
    // Acessa as funções e estados de navegação do contexto
    const {
        currentStep,
        TOTAL_QUESTIONS,
        nextStep,
        prevStep,
        handleSubmit
    } = useFormulario();

    // O App.jsx controla o Step 0 (Informações Iniciais).
    // Aqui, navegamos apenas entre as perguntas (Step 1 a TOTAL_QUESTIONS).
    const isQuestionStep = currentStep >= 1;
    const isLastQuestion = currentStep === TOTAL_QUESTIONS;

    // Se não estivermos em uma etapa de pergunta, não renderiza nada.
    if (!isQuestionStep) {
        return null;
    }

    return (
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">

            {/* Botão ANTERIOR */}
            <button
                onClick={prevStep}
                disabled={currentStep <= 1} // Desabilita na primeira pergunta
                className={`px-6 py-2 rounded-lg transition ${
                    currentStep <= 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                &larr; Anterior
            </button>

            {/* Botões PRÓXIMA / FINALIZAR */}
            {isLastQuestion ? (
                // Se for a última pergunta, mostra FINALIZAR
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
                >
                    Finalizar & Enviar
                </button>
            ) : (
                // Se não for a última, mostra PRÓXIMA
                <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md"
                >
                    Próxima &rarr;
                </button>
            )}
        </div>
    );
};

export default Navegacao;