## 🚀 README.md: Projeto de Avaliação de Perfil OCEAN (Stack MERN)

Olá\! Bem-vindo ao repositório do projeto **Avaliação de Perfil OCEAN (Big Five)**.

Este projeto é uma aplicação *full-stack* desenvolvida para coletar respostas de candidatos e traçar seu perfil psicométrico nas 5 dimensões (Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo), utilizando a **Stack MERN** e **Docker** para padronização do ambiente.

-----

## 🛠️ Stack e Arquitetura

  * **Frontend (Interface):** **React** + **Tailwind CSS**
      * Exibição interativa das 20 questões em formato de *cards*.
  * **Backend (API):** **Node.js** com **Express.js**
      * Recebe os dados, aplica a lógica de pontuação invertida e calcula os scores OCEAN.
  * **Banco de Dados:** **MongoDB**
      * Armazena as informações do candidato, as 20 respostas brutas e os 5 scores calculados.
  * **Infraestrutura:** **Docker** e **Docker Compose**
      * Orquestração de todos os serviços em um ambiente isolado.

-----

## ⚙️ Configuração e Inicialização do Ambiente

O projeto foi configurado para ser iniciado rapidamente usando o Docker Compose.

### Pré-requisitos

Certifique-se de que o **Docker** e o **Docker Compose** estejam instalados na sua máquina.

### 1\. Clonar e Acessar

```bash
# Navegue até a pasta criada pelo script setup.sh (se você o usou)
cd projeto-recrutamento
```

### 2\. Inicializar os Serviços

Execute o comando abaixo na pasta raiz (`projeto-recrutamento/`) para construir as imagens e iniciar os 3 containers (Frontend, Backend, MongoDB):

```bash
docker-compose up --build
```

### URLs de Acesso

| Serviço | Porta (Host) | URL de Acesso |
| :---: | :---: | :--- |
| **Frontend (App)** | `3000` | **`http://localhost:3000`** |
| **Backend (API)** | `5000` | `http://localhost:5000/api/submit` |
| **Banco de Dados** | `27017` | `mongodb://localhost:27017` (Acesso via cliente Mongo) |

-----

## 👥 Divisão de Responsabilidades (Kanban)

O foco da equipe nas próximas duas semanas (Sprint) é entregar o fluxo de submissão do formulário funcional.

| Desenvolvedor | Foco Principal | Tarefas Chave (Início) |
| :---: | :--- | :--- |
| **Dev A** (Infra) | **Infraestrutura / Docker** | Garantir que o `docker-compose.yml` e os `Dockerfiles` funcionem em todos os ambientes. |
| **Dev B & C** (Backend) | **API / Lógica OCEAN** | Implementação dos modelos Mongoose (`Candidato`/`Avaliacao`) e da função **`calcularScoresOcean`**. |
| **Dev D & E** (Frontend) | **Interface / Estado** | Configuração do React/Tailwind e criação do componente **`CardForm`** com a lógica de navegação. |

### 🚨 Regra de Ouro

O **Backend** deve ser a única fonte de verdade para o **cálculo do score OCEAN**. O Frontend só envia as respostas brutas.

-----

## 📚 Estrutura do Código

Os arquivos essenciais que precisam de atenção imediata estão localizados nas seguintes pastas:

  * **Lógica OCEAN:** `backend/utils/calcularScoresOcean.js`
  * **Modelos DB:** `backend/models/Candidato.js` e `backend/models/Avaliacao.js`
  * **Recebimento de Dados:** `backend/routes/avaliacao.js` (Implementar a rota POST)
  * **Estado Frontend:** `frontend/src/context/FormularioContext.jsx` (Gerenciar as 20 respostas)
  * **Componente UI:** `frontend/src/components/CardForm.jsx`

