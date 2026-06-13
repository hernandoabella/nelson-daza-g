import { FaStar } from "react-icons/fa"

const items = [
  "Visa M · Cónyuge", "Nómada Digital", "Inversionista", "Pensionado",
  "Residencia R", "Nacionalidad", "Bienes Raíces", "Empresa en Colombia",
]

export function MarqueeBanner() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-item marquee-sep" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.4rem" }}>
              <FaStar />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
