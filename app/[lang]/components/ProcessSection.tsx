export function ProcessSection({ dict }: { dict: Record<string, any>; lang: string }) {
  return (
    <section id="process">
      <div className="section-label">{dict.process.label}</div>
      <h2 dangerouslySetInnerHTML={{ __html: dict.process.title.replace(/\n/g, "<br />") }} />
      <div className="process-steps">
        {dict.process.steps.map((s: any, i: number) => (
          <div className="step reveal" key={i}>
            <div className="step-circle">{s.num}</div>
            <h4>{s.name}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
