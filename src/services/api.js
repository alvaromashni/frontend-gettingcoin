import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export async function fetchLatestRates() {
  const { data } = await api.get('/rates/latest')
  return data
}

export async function fetchSummary(currency) {
  const { data } = await api.get('/rates/summary', { params: { currency } })
  return data
}

export async function fetchComparison(from, to) {
  const { data } = await api.get('/rates/compare', { params: { from, to } })
  return data
}

export async function fetchVariation(currency) {
  const { data } = await api.get('/rates/variation', { params: { currency } })
  return data
}
