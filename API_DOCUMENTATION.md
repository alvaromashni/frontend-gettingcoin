# GettingCoin API

API para consulta de cotações de moedas.

**URL Base:** `http://localhost:8080/api`

---

## Endpoints

### Cotações Recentes

Retorna as cotações mais recentes de todas as moedas.

```
GET /rates/latest
```

**Resposta:**
```json
[
  {
    "currency": "BRL",
    "rate": 5.25,
    "date": "2024-01-15"
  }
]
```

---

### Resumo por Moeda

Retorna estatísticas de uma moeda (média, mínimo, máximo).

```
GET /rates/summary?currency={moeda}
```

**Parâmetros:**
| Nome     | Tipo   | Descrição       |
|----------|--------|-----------------|
| currency | string | Código da moeda |

**Exemplo:** `/rates/summary?currency=BRL`

**Resposta:**
```json
{
  "currency": "BRL",
  "average": 5.18,
  "min": 4.95,
  "max": 5.42,
  "periodStart": "2024-01-01",
  "periodEnd": "2024-01-15"
}
```

---

### Comparar Moedas

Compara a cotação entre duas moedas ao longo do tempo.

```
GET /rates/compare?from={moeda1}&to={moeda2}
```

**Parâmetros:**
| Nome | Tipo   | Descrição              |
|------|--------|------------------------|
| from | string | Moeda de origem        |
| to   | string | Moeda de destino       |

**Exemplo:** `/rates/compare?from=USD&to=BRL`

**Resposta:**
```json
[
  {
    "date": "2024-01-15",
    "fromCurrency": "USD",
    "fromRate": 1.00,
    "toCurrency": "BRL",
    "toRate": 5.25
  }
]
```

---

### Variação Diária

Retorna a variação percentual diária de uma moeda.

```
GET /rates/variation?currency={moeda}
```

**Parâmetros:**
| Nome     | Tipo   | Descrição       |
|----------|--------|-----------------|
| currency | string | Código da moeda |

**Exemplo:** `/rates/variation?currency=EUR`

**Resposta:**
```json
[
  {
    "date": "2024-01-15",
    "currency": "EUR",
    "rate": 5.68,
    "variationPercent": 0.53
  }
]
```

---

## Swagger UI

Documentação interativa disponível em:

```
http://localhost:8080/api/swagger-ui/index.html
```
