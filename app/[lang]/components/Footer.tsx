export function Footer({ dict, onBook }: { dict: Record<string, any>; lang: string; onBook: () => void }) {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <img src="/logo.jpeg" alt="Nelson Daza" style={{ height: "150px", width: "auto", display: "block", marginBottom: "16px" }} />
          <p>{dict.footer.brand}</p>
        </div>
        <div className="footer-links">
          <h5>{dict.footer.servicesTitle}</h5>
          <ul>
            {dict.footer.services.map((s: string, i: number) => (
              <li key={i}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-links">
          <h5>{dict.footer.infoTitle}</h5>
          <ul>
            {dict.footer.info.map((item: string, i: number) => {
              const anchors = ["about", "pricing", "process", "contact", ""]
              return (
                <li key={i}>
                  <a
                    href={i < 4 ? `#${anchors[i]}` : "https://wa.me/573127323913"}
                    target={i === 4 ? "_blank" : undefined}
                  >
                    {item}
                  </a>
                </li>
              )
            })}
          </ul>
          <button
            className="btn-primary"
            onClick={onBook}
            style={{ marginTop: "16px", padding: "10px 20px", fontSize: "0.62rem", border: "none", cursor: "pointer" }}
          >
            {dict.nav.cta}
          </button>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>{dict.footer.copyright}</p>
        <p>{dict.footer.privacy}</p>
      </div>
    </>
  )
}
