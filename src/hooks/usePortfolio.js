import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkPortfolio, indexPortfolio } from '../services/api'

export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function usePortfolio() {
  const { uuid: uuidParam } = useParams()
  const navigate = useNavigate()

  const uuid = uuidParam && UUID_PATTERN.test(uuidParam) ? uuidParam : null
  const isInvalidLink = Boolean(uuidParam) && !uuid

  const [isIndexing, setIsIndexing] = useState(false)
  const [isChecking, setIsChecking] = useState(Boolean(uuid))
  const [isExpired, setIsExpired] = useState(false)
  const [indexError, setIndexError] = useState('')
  const [indexStep, setIndexStep] = useState(0)

  useEffect(() => {
    if (!uuid) {
      setIsChecking(false)
      setIsExpired(false)
      return undefined
    }

    let cancelled = false
    setIsChecking(true)
    setIsExpired(false)
    setIndexError('')

    checkPortfolio(uuid)
      .then(() => {
        if (!cancelled) {
          setIsExpired(false)
        }
      })
      .catch((error) => {
        if (cancelled) return
        if (error?.status === 404) {
          setIsExpired(true)
          return
        }
        setIndexError(
          error?.message ||
            'Unable to open this business assistant right now. Please try again.',
        )
      })
      .finally(() => {
        if (!cancelled) {
          setIsChecking(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [uuid])

  const createAssistant = useCallback(
    async (file) => {
      setIsIndexing(true)
      setIndexError('')
      setIndexStep(0)

      const stepTimers = [
        setTimeout(() => setIndexStep(1), 800),
        setTimeout(() => setIndexStep(2), 2200),
        setTimeout(() => setIndexStep(3), 4000),
      ]

      try {
        const data = await indexPortfolio(file)
        if (!data?.uuid || !UUID_PATTERN.test(data.uuid)) {
          throw new Error('Invalid response from server.')
        }

        navigate(`/try/${data.uuid}`, { replace: true })
        return data.uuid
      } catch (error) {
        setIndexError(
          error?.message ||
            "We couldn't index this document. Please check the file and try again.",
        )
        return null
      } finally {
        stepTimers.forEach(clearTimeout)
        setIsIndexing(false)
        setIndexStep(0)
      }
    },
    [navigate],
  )

  const clearPortfolio = useCallback(() => {
    setIndexError('')
    navigate('/try', { replace: true })
  }, [navigate])

  const markExpired = useCallback(() => {
    setIsExpired(true)
  }, [])

  return {
    uuid,
    isInvalidLink,
    isChecking,
    isExpired,
    isIndexing,
    indexError,
    indexStep,
    createAssistant,
    clearPortfolio,
    markExpired,
    setIndexError,
  }
}
