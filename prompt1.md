Você é um engenheiro front-end sênior. Sua tarefa é criar uma interface web moderna e interativa para consumir uma API REST de cotações de moedas que está rodando localmente.

Antes de escrever qualquer código, leia obrigatoriamente o arquivo de skill em /mnt/skills/public/frontend-design/SKILL.md e siga todas as diretrizes descritas nele.

---

## Contexto da API

A API está disponível em http://localhost:8081/api e expõe os seguintes endpoints:

GET /rates/latest
Retorna a cotação mais recente de EUR, BRL e GBP em relação ao USD.
Resposta:
[
  { "currency": "BRL", "rate": 5.843200, "date": "2026-03-14" },
  { "currency": "EUR", "rate": 0.921400, "date": "2026-03-14" },
  { "currency": "GBP", "rate": 0.784600, "date": "2026-03-14" }
]

GET /rates/summary?currency={moeda}
Retorna média, mínima e máxima dos últimos 7 dias. Moedas aceitas: EUR, BRL, GBP.
Resposta:
{
  "currency": "BRL",
  "average": 5.821300,
  "min": 5.780000,
  "max": 5.870000,
  "periodStart": "2026-03-07",
  "periodEnd": "2026-03-14"
}

GET /rates/compare?from={moeda}&to={moeda}
Compara duas moedas dia a dia nos últimos 7 dias.
Resposta:
[
  {
    "date": "2026-03-08",
    "fromCurrency": "EUR",
    "fromRate": 0.919800,
    "toCurrency": "BRL",
    "toRate": 5.810000
  }
]

GET /rates/variation?currency={moeda}
Retorna a variação percentual dia a dia de uma moeda.
Resposta:
[
  {
    "date": "2026-03-09",
    "currency": "EUR",
    "rate": 0.921400,
    "variationPercent": 0.1742
  }
]

---

## Stack obrigatória

Inicialize o projeto com:

npm create vite@latest frontend-gettingcoin -- --template react
cd getting-coin-ui
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @radix-ui/react-icons
npx shadcn@latest init
npx shadcn@latest add card badge tabs table button select separator

---

## O que construir

Crie uma single-page application com as seguintes seções:

1. Header
   - Nome da aplicação: "GettingCoin"
   - Indicador de status da API (verde se online, vermelho se offline)
   - Data atual

2. Seção "Cotações atuais"
   - Cards para BRL, EUR e GBP mostrando a cotação mais recente em relação ao USD
   - Indicador visual de variação (positiva ou negativa) comparando com o dia anterior
   - Data da última atualização

3. Seção "Resumo semanal"
   - Seletor de moeda (EUR, BRL, GBP)
   - Card com média, mínima e máxima do período
   - Gráfico de linha com a evolução da cotação nos 7 dias usando recharts

4. Seção "Comparação entre moedas"
   - Dois seletores de moeda (from e to)
   - Tabela com as cotações lado a lado por data
   - Gráfico de linhas duplo comparando as duas moedas usando recharts

5. Seção "Variação diária"
   - Seletor de moeda
   - Tabela mostrando data, cotação e variação percentual
   - Variação positiva em verde, negativa em vermelho

---

## Requisitos técnicos

- Utilize fetch nativo para consumir a API, sem bibliotecas externas de HTTP
- Implemente loading states em todas as seções enquanto os dados carregam
- Implemente tratamento de erro caso a API esteja indisponível
- Os dados devem ser recarregados automaticamente a cada 60 segundos
- Utilize hooks customizados para encapsular a lógica de fetch de cada endpoint
- Separe os componentes em arquivos individuais dentro de src/components/
- Crie um arquivo src/services/api.js centralizando todas as chamadas à API
- A interface deve ser responsiva para desktop e mobile
- Utilize as variáveis de cor e componentes do shadcn — não crie estilos inline desnecessários

---

## Estrutura de arquivos esperada

frontend-gettincoin/
|-- src/
|   |-- components/
|   |   |-- Header.jsx
|   |   |-- LatestRates.jsx
|   |   |-- WeeklySummary.jsx
|   |   |-- CurrencyComparison.jsx
|   |   |-- DailyVariation.jsx
|   |-- hooks/
|   |   |-- useLatestRates.js
|   |   |-- useSummary.js
|   |   |-- useComparison.js
|   |   |-- useVariation.js
|   |-- services/
|   |   |-- api.js
|   |-- App.jsx
|   |-- main.jsx
|-- index.html
|-- package.json
|-- tailwind.config.js
|-- vite.config.js

---

## Qualidade visual esperada

- Interface light mode como padrão
- Tipografia escura com hierarquia bem definida
- Transições suaves ao trocar de moeda ou carregar dados
- Utilize um design moderno/cool
- Gráficos com cores distintas por moeda: BRL em roxo, EUR em azul, GBP em laranja
- Skeleton loading nos cards enquanto os dados carregam
- Nenhum dado mock — todos os dados vêm exclusivamente da API