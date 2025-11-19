import React from 'react';
import { useFormulario } from '../context/FormularioContext';

const TRACOS = [
    { id: 'abertura', label: 'Abertura à Experiência', desc: 'Criatividade e curiosidade intelectual.' },
    { id: 'conscienciosidade', label: 'Conscienciosidade', desc: 'Disciplina, organização e foco em metas.' },
    { id: 'extroversao', label: 'Extroversão', desc: 'Energia social e assertividade.' },
    { id: 'amabilidade', label: 'Amabilidade', desc: 'Cooperação, empatia e confiança nos outros.' },
    { id: 'neuroticismo', label: 'Estabilidade Emocional', desc: 'Controle de estresse e resiliência.' } // Nome adaptado para leitura positiva
];

const ResultadoPerfil = () => {
    const { resultadoPerfil, candidatoInfo, resetForm } = useFormulario();

    if (!resultadoPerfil) return <p>Carregando resultados...</p>;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Perfil Comportamental Mapeado</h2>
                <p className="text-gray-600 mt-2">
                    Candidato: <span className="font-semibold">{candidatoInfo.nomeCompleto}</span>
                </p>
            </div>

            <div className="grid gap-6">
                {TRACOS.map((traco) => {
                    // O score vai de 0 a 16. Calculamos a porcentagem.
                    const score = resultadoPerfil[traco.id];
                    const porcentagem = (score / 16) * 100;

                    // Define cor baseada na intensidade
                    let corBarra = 'bg-blue-500';
                    if (porcentagem < 35) corBarra = 'bg-yellow-500';
                    if (porcentagem > 75) corBarra = 'bg-green-500';

                    return (
                        <div key={traco.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-700">{traco.label}</h3>
                                    <p className="text-xs text-gray-500">{traco.desc}</p>
                                </div>
                                <span className="font-mono font-bold text-indigo-700">{score} / 16</span>
                            </div>

                            {/* Barra de Progresso */}
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-full ${corBarra} transition-all duration-1000 ease-out`}
                                    style={{ width: `${porcentagem}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-center pt-6 border-t">
                <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition shadow-lg"
                >
                    Realizar Novo Teste
                </button>
            </div>
        </div>
    );
};

export default ResultadoPerfil;