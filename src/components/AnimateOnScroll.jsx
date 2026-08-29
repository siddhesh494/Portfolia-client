import { useInView } from '../hooks/useInView'

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}) {
  const [ref, isInView] = useInView({ once: true })

  return (
    <Tag
      ref={ref}
      className={`reveal ${isInView ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
