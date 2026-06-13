export function Footer({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <a href="#" className="footer-logo">Nelson <span>Daza</span></a>
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
            {dict.footer.info.map((item: string, i: number) => (
              <li key={i}>
                <a href={i === dict.footer.info.length - 1 ? "https://wa.me/573127323913" : `#${["about", "pricing", "process", "contact"][i] || ""}`}
                   target={i === dict.footer.info.length - 1 ? "_blank" : undefined}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>{dict.footer.copyright}</p>
        <p>{dict.footer.privacy}</p>
      </div>
    </>
  )
}
