import { useEffect, useRef, useState } from 'react'

export function useInView({ once = true, threshold = 0.12, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return [ref, isInView]
}
