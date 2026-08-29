import { useCallback, useState } from 'react'
import { indexPortfolio } from '../services/api'

const STORAGE_KEY = 'portfolio_uuid'

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function readStoredUuid() {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY)
    if (value && UUID_PATTERN.test(value)) {
      return value
    }
  } catch {
    // sessionStorage may be unavailable
  }
  return null
}

export function usePortfolio() {
  const [uuid, setUuid] = useState(() => readStoredUuid())
  const [isIndexing, setIsIndexing] = useState(false)
  const [indexError, setIndexError] = useState('')
  const [indexStep, setIndexStep] = useState(0)

  const createAssistant = useCallback(async (url) => {
    setIsIndexing(true)
    setIndexError('')
    setIndexStep(0)

    const stepTimers = [
      setTimeout(() => setIndexStep(1), 1200),
      setTimeout(() => setIndexStep(2), 3200),
      setTimeout(() => setIndexStep(3), 5200),
    ]

    try {
      const data = await indexPortfolio(url)
      if (!data?.uuid || !UUID_PATTERN.test(data.uuid)) {
        throw new Error('Invalid response from server.')
      }

      setUuid(data.uuid)
      try {
        sessionStorage.setItem(STORAGE_KEY, data.uuid)
      } catch {
        // ignore storage errors
      }
      return data.uuid
    } catch (error) {
      setIndexError(
        error?.message ||
          "We couldn't index this portfolio. Please check the URL and try again.",
      )
      return null
    } finally {
      stepTimers.forEach(clearTimeout)
      setIsIndexing(false)
      setIndexStep(0)
    }
  }, [])

  const clearPortfolio = useCallback(() => {
    setUuid(null)
    setIndexError('')
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return {
    uuid,
    isIndexing,
    indexError,
    indexStep,
    createAssistant,
    clearPortfolio,
    setIndexError,
  }
}
