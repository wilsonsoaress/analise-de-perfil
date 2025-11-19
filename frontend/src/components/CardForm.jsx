import React from 'react';
import { useFormulario } from '../context/FormularioContext';

// Definições Estáticas para a Escala Likert (0 a 4)
const ESCALA_LIKERT = [
    { value: 0, label: 'Não me identifico' },
    { value: 1, label: 'Me identifico pouco' },
    { value: 2, label: 'Neutro' },
    { value: 3, label: 'Me identifico parcialmente' },
    { value: 4, label: 'Me identifico totalmente' },
];

/**
 * Componente que exibe o card da pergunta e as opções de resposta.
 * @param {object} props - Propriedades do componente.
 * @param {string} props.id - ID da questão (ex: 'A1').
 * @param {string} props.texto - Texto completo da pergunta.
 */
const CardForm = ({ id, texto }) => {
    // 1. Acessa o estado e as funções do formulário
    const { respostas, updateResposta } = useFormulario();

    // 2. Encontra a resposta atual para esta questão
    const respostaAtual = respostas.find(r => r.idQuestao === id);
    const pontuacaoSelecionada = respostaAtual ? respostaAtual.pontuacao : -1;

    // 3. Função para lidar com a seleção de resposta
    const handleSelection = (value) => {
        // Converte o valor para número e chama a função do contexto
        updateResposta(id, parseInt(value, 10));
    };

    return (
        <div className="flex flex-col space-y-6">

            {/* -------------------- TEXTO DA PERGUNTA -------------------- */}
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <p className="text-lg font-medium text-gray-800">
                    {texto}
                </p>
            </div>

            {/* -------------------- OPÇÕES DE RESPOSTA (LIKERT) -------------------- */}
            <div className="flex flex-col space-y-3">
                {ESCALA_LIKERT.map(({ value, label }) => (
                    <label
                        key={value}
                        className={`
                            flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200
                            ${pontuacaoSelecionada === value
                                ? 'bg-indigo-600 shadow-md text-white border-indigo-700'
                                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800'
                            }
                        `}
                    >
                        <input
                            type="radio"
                            name={`questao-${id}`} // Garante que apenas uma opção possa ser selecionada
                            value={value}
                            checked={pontuacaoSelecionada === value}
                            onChange={(e) => handleSelection(e.target.value)}
                            className={`
                                h-5 w-5 mr-4 transition-colors duration-200
                                ${pontuacaoSelecionada === value
                                    ? 'text-white border-white ring-indigo-300'
                                    : 'text-indigo-600 border-gray-400 focus:ring-indigo-500'
                                }
                            `}
                            // Estilização customizada de rádio-botão pode ser necessária com Tailwind
                        />
                        <span className={`text-base font-medium ${pontuacaoSelecionada === value ? 'text-white' : 'text-gray-800'}`}>
                            {label}
                        </span>
                    </label>
                ))}
            </div>

            {/* DEBUG (Opcional) */}
            {/* <p className="text-xs text-gray-400">Resposta salva para {id}: {pontuacaoSelecionada}</p> */}

        </div>
    );
};

export default CardForm;