# GettingCoin UI

Interface web para visualização de cotações de moedas em tempo real, construída com React + Vite. Consome os dados da API [GettingCoin](https://github.com/alvaromashni/gettingcoin).

---

## Sobre

O **GettingCoin UI** é uma single-page application que exibe cotações de BRL, EUR e GBP em relação ao USD, com atualização automática a cada 60 segundos.

## Funcionalidades

- **Cotações atuais** — cards com a cotação mais recente de cada moeda e indicador de variação em relação ao dia anterior
- **Resumo semanal** — média, mínima e máxima dos últimos 7 dias com gráfico de linha por moeda
- **Comparação entre moedas** — tabela e gráfico de linhas duplo comparando duas moedas dia a dia
- **Variação diária** — tabela com variação percentual de cada dia, destacada em verde (alta) ou vermelho (queda)
- **Status da API** — indicador no header mostrando se a API está online ou offline

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) — componentes de UI (Card, Badge, Table, Select, Tabs, Separator)
- [Recharts](https://recharts.org/) — gráficos de linha
- [Axios](https://axios-http.com/) — cliente HTTP

## Estrutura de arquivos

```
src/
├── components/
│   ├── Header.jsx           # Header com status da API e data atual
│   ├── LatestRates.jsx      # Seção de cotações atuais
│   ├── WeeklySummary.jsx    # Seção de resumo semanal
│   ├── CurrencyComparison.jsx  # Seção de comparação entre moedas
│   └── DailyVariation.jsx   # Seção de variação diária
├── hooks/
│   ├── useLatestRates.js    # Fetch de /rates/latest
│   ├── useSummary.js        # Fetch de /rates/summary
│   ├── useComparison.js     # Fetch de /rates/compare
│   └── useVariation.js      # Fetch de /rates/variation
├── services/
│   └── api.js               # Instância Axios centralizada
├── App.jsx
└── main.jsx
```

## Como rodar

Certifique-se de que a API [GettingCoin](https://github.com/alvaromashni/gettingcoin) está rodando em `http://localhost:8080`.

```bash
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`. O Vite faz proxy das requisições `/api/*` para `http://localhost:8080`, evitando problemas de CORS.

## API

Documentação completa dos endpoints disponível em:

```
http://localhost:8080/api/swagger-ui/index.html
```

| Endpoint | Descrição |
|---|---|
| `GET /rates/latest` | Cotações mais recentes de todas as moedas |
| `GET /rates/summary?currency=BRL` | Média, mínima e máxima dos últimos 7 dias |
| `GET /rates/compare?from=EUR&to=BRL` | Comparação dia a dia entre duas moedas |
| `GET /rates/variation?currency=EUR` | Variação percentual diária de uma moeda |
