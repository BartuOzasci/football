export default function Card({ children, className = "" }) {
  return (
    <article
      className={`card-3d glass-panel overflow-hidden rounded-2xl ${className}`}
    >
      {children}
    </article>
  )
}
