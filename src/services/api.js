import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
})

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

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

function toApiError(error, fallback) {
  return new ApiError(
    getErrorMessage(error, fallback),
    error?.response?.status,
  )
}

export async function indexPortfolio(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await client.post('/api/index', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    throw toApiError(
      error,
      "We couldn't index this document. Please check the file and try again.",
    )
  }
}

export async function checkPortfolio(uuid) {
  try {
    const { data } = await client.get(`/api/portfolio/${uuid}`)
    return data
  } catch (error) {
    throw toApiError(
      error,
      'This business assistant is no longer available. Upload a document to create a new one.',
    )
  }
}

export async function askQuestion(uuid, threadId, question) {
  try {
    const { data } = await client.post(
      '/api/chat',
      { uuid, thread_id: threadId, question },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return data
  } catch (error) {
    throw toApiError(error, 'Something went wrong. Please try again.')
  }
}

export { API_BASE_URL }
