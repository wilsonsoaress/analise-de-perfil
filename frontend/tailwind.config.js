// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Onde o Tailwind deve buscar as classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Busca arquivos em src/
    "./public/index.html",       // Busca no arquivo HTML principal
  ],

  // 2. Configuração do Tema
  theme: {
    extend: {
      // Exemplo de como adicionar cores customizadas para a marca
      colors: {
        'brand-primary': '#4f46e5', // Um índigo/violeta (usado no planejamento)
        'brand-secondary': '#10b981', // Um verde esmeralda
      },
      // Exemplo de como customizar fontes
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Exemplo de como customizar tamanhos de card
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },

  // 3. Plugins adicionais (opcional)
  plugins: [
    // require('@tailwindcss/forms'), // Se for usar formulários complexos
  ],
}