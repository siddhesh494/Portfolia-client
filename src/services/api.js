import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000,
})

function getErrorMessage(error, fallback) {
  const detail = error?.response?.data?.detail
  if (typeof detail === 'string' && detail.trim()) {
    return detail
  }
  if (Array.isArray(detail) && detail[0]?.msg) {
    return detail[0].msg
  }
  return fallback
}

export async function indexPortfolio(url) {
  try {
    const { data } = await client.post('/api/index', { url })
    return data
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "We couldn't index this portfolio. Please check the URL and try again.",
      ),
    )
  }
}

export async function askQuestion(uuid, question) {
  try {
    const { data } = await client.post('/api/chat', { uuid, question })
    return data
  } catch (error) {
    throw new Error(
      getErrorMessage(error, 'Something went wrong. Please try again.'),
    )
  }
}

export { API_BASE_URL }
