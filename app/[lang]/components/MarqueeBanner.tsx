const items = [
  "Visa M · Cónyuge", "Nómada Digital", "Inversionista", "Pensionado",
  "Residencia R", "Nacionalidad", "Bienes Raíces", "Empresa en Colombia",
]

export function MarqueeBanner() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-item marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
