"use client"

import { useState } from "react"
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa"

const steps = [
  "personal", "colombia", "objetivo", "relacion", "empleo",
  "independiente", "nomada", "pensionado", "inversionista",
  "empresario", "estudiante", "historial", "residencia", "documentos", "presupuesto",
]

export function EvaluationForm({
  onComplete, onSkip,
}: {
  onComplete: (data: any) => void; onSkip: () => void
}) {
  const [step, setStep] = useState(0)
  const total = steps.length

  const [f, setF] = useState({
    name: "", nationality: "", nationality2: "", dob: "", maritalStatus: "",
    email: "", whatsapp: "", language: "",
    inColombia: "", status: "", entryDate: "", city: "", daysPerYear: "",
    objective: "",
    marriedColombian: "", marriagePlace: "", civilRegistry: "", cohabitation: "",
    hasPartner: "", partnerDuration: "", liveTogether: "", commonChildren: "",
    hasColombianChildren: "", childrenCount: "", childrenAges: "", childrenInColombia: "",
    jobOffer: "", companyName: "", position: "", salary: "", companyRegistered: "",
    isFreelance: "", profession: "", intlClients: "", canShowIncome: "", avgIncome: "",
    remoteWork: "", remoteCountry: "", employmentType: "", remoteIncome: "", canShow6Months: "",
    hasPension: "", pensionCountry: "", pensionAmount: "", pensionCert: "",
    hasInvestments: "", investmentType: "", investmentValue: "", investmentRegistered: "",
    isOwner: "", ownerCountry: "", companyName2: "", wantsColombiaOps: "",
    isStudent: "", institution: "", program: "", programDuration: "",
    hadVisaBefore: "", prevVisaType: "", prevVisaDates: "", visaDenied: "", visaDeniedWhen: "", visaDeniedReason: "",
    deported: "", deportedExplain: "", criminalRecord: "", criminalExplain: "",
    yearsInColombia: "", hadVisaM: "", yearsVisaM: "", hasPPT: "", pptSince: "",
    documents: [] as string[],
    timeline: "",
  })

  const update = (field: string, value: any) => setF((prev) => ({ ...prev, [field]: value }))
  const toggleDoc = (doc: string) => {
    setF((prev) => ({
      ...prev,
      documents: prev.documents.includes(doc)
        ? prev.documents.filter((d: string) => d !== doc)
        : [...prev.documents, doc],
    }))
  }

  const inputStyle = { background: "var(--white)", border: "1px solid var(--border)", color: "var(--ink)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "11px 14px", outline: "none", width: "100%" }
  const labelStyle = { fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray)", marginBottom: "4px", display: "block" }
  const selectStyle = { ...inputStyle, appearance: "none" as const, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A6794F' stroke-width='1.5'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }

  const renderStep = () => {
    const s = steps[step]
    switch (s) {
      case "personal": return (
        <div className="form-columns" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>1. INFORMACIÓN PERSONAL</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>Nombre completo</label><input style={inputStyle} value={f.name} onChange={e => update("name", e.target.value)} /></div>
            <div className="form-group"><label style={labelStyle}>Nacionalidad</label><input style={inputStyle} value={f.nationality} onChange={e => update("nationality", e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>Segunda nacionalidad (si aplica)</label><input style={inputStyle} value={f.nationality2} onChange={e => update("nationality2", e.target.value)} /></div>
            <div className="form-group"><label style={labelStyle}>Fecha de nacimiento</label><input style={inputStyle} type="date" value={f.dob} onChange={e => update("dob", e.target.value)} /></div>
          </div>
          <div className="form-group">
            <label style={labelStyle}>Estado civil</label>
            <select style={selectStyle} value={f.maritalStatus} onChange={e => update("maritalStatus", e.target.value)}>
              <option value="">Seleccionar...</option>
              <option>Soltero</option><option>Casado</option><option>Unión libre</option><option>Divorciado</option><option>Viudo</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>Correo electrónico</label><input style={inputStyle} type="email" value={f.email} onChange={e => update("email", e.target.value)} /></div>
            <div className="form-group"><label style={labelStyle}>WhatsApp</label><input style={inputStyle} value={f.whatsapp} onChange={e => update("whatsapp", e.target.value)} /></div>
          </div>
          <div className="form-group">
            <label style={labelStyle}>Idioma preferido</label>
            <select style={selectStyle} value={f.language} onChange={e => update("language", e.target.value)}>
              <option value="">Seleccionar...</option><option>Español</option><option>Inglés</option><option>Ruso</option><option>Otro</option>
            </select>
          </div>
        </div>
      )

      case "colombia": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>2. SITUACIÓN ACTUAL EN COLOMBIA</p>
          <div className="form-group">
            <label style={labelStyle}>¿Se encuentra actualmente en Colombia?</label>
            <select style={selectStyle} value={f.inColombia} onChange={e => update("inColombia", e.target.value)}>
              <option value="">Seleccionar...</option><option>Sí</option><option>No</option>
            </select>
          </div>
          {f.inColombia === "Sí" && (
            <>
              <div className="form-group">
                <label style={labelStyle}>Estatus migratorio</label>
                <select style={selectStyle} value={f.status} onChange={e => update("status", e.target.value)}>
                  <option value="">Seleccionar...</option><option>Turista</option><option>Visa V</option><option>Visa M</option><option>Visa R</option><option>PPT</option><option>Otro</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group"><label style={labelStyle}>Fecha de último ingreso</label><input style={inputStyle} type="date" value={f.entryDate} onChange={e => update("entryDate", e.target.value)} /></div>
                <div className="form-group"><label style={labelStyle}>Ciudad de residencia</label><input style={inputStyle} value={f.city} onChange={e => update("city", e.target.value)} /></div>
              </div>
              <div className="form-group"><label style={labelStyle}>Días al año en Colombia</label><input style={inputStyle} value={f.daysPerYear} onChange={e => update("daysPerYear", e.target.value)} /></div>
            </>
          )}
        </div>
      )

      case "objetivo": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>3. OBJETIVO PRINCIPAL</p>
          <div className="form-group">
            <label style={labelStyle}>¿Cuál es su objetivo principal en Colombia?</label>
            <select style={selectStyle} value={f.objective} onChange={e => update("objective", e.target.value)}>
              <option value="">Seleccionar...</option>
              <option>Vivir permanentemente</option><option>Trabajar</option><option>Invertir</option>
              <option>Abrir empresa</option><option>Estudiar</option><option>Retirarme/Jubilarme</option>
              <option>Vivir con mi pareja colombiana</option><option>Vivir con mi familia colombiana</option>
              <option>Trabajar remotamente</option><option>Turismo prolongado</option><option>Otro</option>
            </select>
          </div>
        </div>
      )

      case "relacion": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>4. RELACIÓN CON COLOMBIANOS</p>
          <div className="form-row">
            <div className="form-group">
              <label style={labelStyle}>¿Casado con colombiano?</label>
              <select style={selectStyle} value={f.marriedColombian} onChange={e => update("marriedColombian", e.target.value)}>
                <option value="">...</option><option>Sí</option><option>No</option>
              </select>
            </div>
            {f.marriedColombian === "Sí" && <div className="form-group"><label style={labelStyle}>¿Dónde se celebró?</label><input style={inputStyle} value={f.marriagePlace} onChange={e => update("marriagePlace", e.target.value)} /></div>}
          </div>
          {f.marriedColombian === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>¿Posee registro civil colombiano?</label><select style={selectStyle} value={f.civilRegistry} onChange={e => update("civilRegistry", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
              <div className="form-group"><label style={labelStyle}>¿Convive actualmente?</label><select style={selectStyle} value={f.cohabitation} onChange={e => update("cohabitation", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </div>
          )}
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Pareja colombiana sin casarse?</label><select style={selectStyle} value={f.hasPartner} onChange={e => update("hasPartner", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.hasPartner === "Sí" && <div className="form-group"><label style={labelStyle}>¿Cuánto tiempo juntos?</label><input style={inputStyle} value={f.partnerDuration} onChange={e => update("partnerDuration", e.target.value)} /></div>}
          </div>
          {f.hasPartner === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>¿Viven juntos?</label><select style={selectStyle} value={f.liveTogether} onChange={e => update("liveTogether", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
              <div className="form-group"><label style={labelStyle}>¿Hijos en común?</label><select style={selectStyle} value={f.commonChildren} onChange={e => update("commonChildren", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </div>
          )}
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Hijos colombianos?</label><select style={selectStyle} value={f.hasColombianChildren} onChange={e => update("hasColombianChildren", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.hasColombianChildren === "Sí" && <div className="form-group"><label style={labelStyle}>Cantidad</label><input style={inputStyle} value={f.childrenCount} onChange={e => update("childrenCount", e.target.value)} /></div>}
          </div>
          {f.hasColombianChildren === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>Edad de cada hijo</label><input style={inputStyle} value={f.childrenAges} onChange={e => update("childrenAges", e.target.value)} /></div>
              <div className="form-group"><label style={labelStyle}>¿Viven en Colombia?</label><select style={selectStyle} value={f.childrenInColombia} onChange={e => update("childrenInColombia", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </div>
          )}
        </div>
      )

      case "empleo": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>5. EMPLEO</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Oferta laboral en Colombia?</label><select style={selectStyle} value={f.jobOffer} onChange={e => update("jobOffer", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.jobOffer === "Sí" && <div className="form-group"><label style={labelStyle}>Empresa</label><input style={inputStyle} value={f.companyName} onChange={e => update("companyName", e.target.value)} /></div>}
          </div>
          {f.jobOffer === "Sí" && (
            <>
              <div className="form-row">
                <div className="form-group"><label style={labelStyle}>Cargo</label><input style={inputStyle} value={f.position} onChange={e => update("position", e.target.value)} /></div>
                <div className="form-group"><label style={labelStyle}>Salario mensual</label><input style={inputStyle} value={f.salary} onChange={e => update("salary", e.target.value)} /></div>
              </div>
              <div className="form-group"><label style={labelStyle}>¿Empresa registrada en Colombia?</label><select style={selectStyle} value={f.companyRegistered} onChange={e => update("companyRegistered", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option><option>No sé</option></select></div>
            </>
          )}
        </div>
      )

      case "independiente": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>6. PROFESIONAL INDEPENDIENTE</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Trabajo por cuenta propia?</label><select style={selectStyle} value={f.isFreelance} onChange={e => update("isFreelance", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.isFreelance === "Sí" && <div className="form-group"><label style={labelStyle}>Profesión</label><input style={inputStyle} value={f.profession} onChange={e => update("profession", e.target.value)} /></div>}
          </div>
          {f.isFreelance === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>¿Clientes internacionales?</label><select style={selectStyle} value={f.intlClients} onChange={e => update("intlClients", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
              <div className="form-group"><label style={labelStyle}>¿Puede demostrar ingresos?</label><select style={selectStyle} value={f.canShowIncome} onChange={e => update("canShowIncome", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </div>
          )}
          {f.isFreelance === "Sí" && f.canShowIncome === "Sí" && (
            <div className="form-group"><label style={labelStyle}>Promedio mensual (USD)</label><input style={inputStyle} value={f.avgIncome} onChange={e => update("avgIncome", e.target.value)} /></div>
          )}
        </div>
      )

      case "nomada": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>7. NÓMADA DIGITAL</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Trabajo remoto para empresa extranjera?</label><select style={selectStyle} value={f.remoteWork} onChange={e => update("remoteWork", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.remoteWork === "Sí" && <div className="form-group"><label style={labelStyle}>País de la empresa</label><input style={inputStyle} value={f.remoteCountry} onChange={e => update("remoteCountry", e.target.value)} /></div>}
          </div>
          {f.remoteWork === "Sí" && (
            <>
              <div className="form-row">
                <div className="form-group"><label style={labelStyle}>¿Empleado o contratista?</label><select style={selectStyle} value={f.employmentType} onChange={e => update("employmentType", e.target.value)}><option value="">...</option><option>Empleado</option><option>Contratista</option></select></div>
                <div className="form-group"><label style={labelStyle}>Ingresos mensuales</label><input style={inputStyle} value={f.remoteIncome} onChange={e => update("remoteIncome", e.target.value)} /></div>
              </div>
              <div className="form-group"><label style={labelStyle}>¿Puede demostrar ingresos últimos 6 meses?</label><select style={selectStyle} value={f.canShow6Months} onChange={e => update("canShow6Months", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </>
          )}
        </div>
      )

      case "pensionado": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>8. PENSIONADO</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Recibe pensión?</label><select style={selectStyle} value={f.hasPension} onChange={e => update("hasPension", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.hasPension === "Sí" && <div className="form-group"><label style={labelStyle}>País</label><input style={inputStyle} value={f.pensionCountry} onChange={e => update("pensionCountry", e.target.value)} /></div>}
          </div>
          {f.hasPension === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>Monto mensual</label><input style={inputStyle} value={f.pensionAmount} onChange={e => update("pensionAmount", e.target.value)} /></div>
              <div className="form-group"><label style={labelStyle}>¿Certificación oficial?</label><select style={selectStyle} value={f.pensionCert} onChange={e => update("pensionCert", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </div>
          )}
        </div>
      )

      case "inversionista": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>9. INVERSIONISTA</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Inversiones en Colombia?</label><select style={selectStyle} value={f.hasInvestments} onChange={e => update("hasInvestments", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.hasInvestments === "Sí" && <div className="form-group"><label style={labelStyle}>Tipo</label><select style={selectStyle} value={f.investmentType} onChange={e => update("investmentType", e.target.value)}><option value="">...</option><option>Bienes raíces</option><option>Empresa</option><option>Acciones</option><option>Otra</option></select></div>}
          </div>
          {f.hasInvestments === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>Valor aproximado</label><input style={inputStyle} value={f.investmentValue} onChange={e => update("investmentValue", e.target.value)} /></div>
              <div className="form-group"><label style={labelStyle}>¿Registrada oficialmente?</label><select style={selectStyle} value={f.investmentRegistered} onChange={e => update("investmentRegistered", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </div>
          )}
        </div>
      )

      case "empresario": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>10. EMPRESARIO</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Propietario/socio de empresa?</label><select style={selectStyle} value={f.isOwner} onChange={e => update("isOwner", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.isOwner === "Sí" && <div className="form-group"><label style={labelStyle}>País de registro</label><input style={inputStyle} value={f.ownerCountry} onChange={e => update("ownerCountry", e.target.value)} /></div>}
          </div>
          {f.isOwner === "Sí" && (
            <>
              <div className="form-group"><label style={labelStyle}>Nombre de la empresa</label><input style={inputStyle} value={f.companyName2} onChange={e => update("companyName2", e.target.value)} /></div>
              <div className="form-group"><label style={labelStyle}>¿Desea abrir operaciones en Colombia?</label><select style={selectStyle} value={f.wantsColombiaOps} onChange={e => update("wantsColombiaOps", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            </>
          )}
        </div>
      )

      case "estudiante": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>11. ESTUDIANTE</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Admitido en institución colombiana?</label><select style={selectStyle} value={f.isStudent} onChange={e => update("isStudent", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.isStudent === "Sí" && <div className="form-group"><label style={labelStyle}>Institución</label><input style={inputStyle} value={f.institution} onChange={e => update("institution", e.target.value)} /></div>}
          </div>
          {f.isStudent === "Sí" && (
            <div className="form-row">
              <div className="form-group"><label style={labelStyle}>Programa</label><input style={inputStyle} value={f.program} onChange={e => update("program", e.target.value)} /></div>
              <div className="form-group"><label style={labelStyle}>Duración</label><input style={inputStyle} value={f.programDuration} onChange={e => update("programDuration", e.target.value)} /></div>
            </div>
          )}
        </div>
      )

      case "historial": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>12. HISTORIAL MIGRATORIO</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Visa colombiana anterior?</label><select style={selectStyle} value={f.hadVisaBefore} onChange={e => update("hadVisaBefore", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.hadVisaBefore === "Sí" && <div className="form-group"><label style={labelStyle}>Tipo</label><input style={inputStyle} value={f.prevVisaType} onChange={e => update("prevVisaType", e.target.value)} /></div>}
          </div>
          {f.hadVisaBefore === "Sí" && <div className="form-group"><label style={labelStyle}>Fechas</label><input style={inputStyle} value={f.prevVisaDates} onChange={e => update("prevVisaDates", e.target.value)} /></div>}
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Visa negada alguna vez?</label><select style={selectStyle} value={f.visaDenied} onChange={e => update("visaDenied", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.visaDenied === "Sí" && <div className="form-group"><label style={labelStyle}>¿Cuándo?</label><input style={inputStyle} value={f.visaDeniedWhen} onChange={e => update("visaDeniedWhen", e.target.value)} /></div>}
          </div>
          {f.visaDenied === "Sí" && <div className="form-group"><label style={labelStyle}>Motivo</label><input style={inputStyle} value={f.visaDeniedReason} onChange={e => update("visaDeniedReason", e.target.value)} /></div>}
          <div className="form-group"><label style={labelStyle}>¿Deportado o expulsado de algún país?</label><select style={selectStyle} value={f.deported} onChange={e => update("deported", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
          {f.deported === "Sí" && <div className="form-group"><label style={labelStyle}>Explique</label><input style={inputStyle} value={f.deportedExplain} onChange={e => update("deportedExplain", e.target.value)} /></div>}
          <div className="form-group"><label style={labelStyle}>¿Antecedentes penales?</label><select style={selectStyle} value={f.criminalRecord} onChange={e => update("criminalRecord", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
          {f.criminalRecord === "Sí" && <div className="form-group"><label style={labelStyle}>Explique</label><input style={inputStyle} value={f.criminalExplain} onChange={e => update("criminalExplain", e.target.value)} /></div>}
        </div>
      )

      case "residencia": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>13. RESIDENCIA</p>
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>Años en Colombia legalmente</label><input style={inputStyle} value={f.yearsInColombia} onChange={e => update("yearsInColombia", e.target.value)} /></div>
            <div className="form-group"><label style={labelStyle}>¿Titular de Visa M?</label><select style={selectStyle} value={f.hadVisaM} onChange={e => update("hadVisaM", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
          </div>
          {f.hadVisaM === "Sí" && <div className="form-group"><label style={labelStyle}>¿Cuántos años?</label><input style={inputStyle} value={f.yearsVisaM} onChange={e => update("yearsVisaM", e.target.value)} /></div>}
          <div className="form-row">
            <div className="form-group"><label style={labelStyle}>¿Posee PPT?</label><select style={selectStyle} value={f.hasPPT} onChange={e => update("hasPPT", e.target.value)}><option value="">...</option><option>Sí</option><option>No</option></select></div>
            {f.hasPPT === "Sí" && <div className="form-group"><label style={labelStyle}>Desde cuándo</label><input style={inputStyle} value={f.pptSince} onChange={e => update("pptSince", e.target.value)} /></div>}
          </div>
        </div>
      )

      case "documentos": {
        const docs = [
          "Pasaporte vigente", "Pasaporte vencido", "Cédula de extranjería",
          "Registro civil de matrimonio", "Declaración de unión marital",
          "Certificado laboral", "Contrato de trabajo", "Certificados bancarios",
          "Declaración de renta", "Certificación de pensión", "Escrituras de inmueble",
          "Certificado de Cámara de Comercio", "Diplomas universitarios", "Certificados de antecedentes",
        ]
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>14. DOCUMENTOS DISPONIBLES</p>
            <p style={{ fontSize: "0.85rem", color: "var(--gray)", marginBottom: "8px" }}>Seleccione los documentos que posee actualmente:</p>
            {docs.map((doc, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0", fontSize: "0.95rem", color: "var(--ink3)", cursor: "pointer", borderBottom: "1px solid var(--border)" }}>
                <input
                  type="checkbox"
                  checked={f.documents.includes(doc)}
                  onChange={() => toggleDoc(doc)}
                  style={{ accentColor: "var(--gold)", width: "16px", height: "16px" }}
                />
                {doc}
              </label>
            ))}
          </div>
        )
      }

      case "presupuesto": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>15. PRESUPUESTO</p>
          <div className="form-group">
            <label style={labelStyle}>¿Cuándo desea iniciar el proceso?</label>
            <select style={selectStyle} value={f.timeline} onChange={e => update("timeline", e.target.value)}>
              <option value="">Seleccionar...</option>
              <option>Inmediatamente</option><option>30 días</option><option>3 meses</option><option>6 meses</option><option>Más adelante</option>
            </select>
          </div>
          <div style={{ marginTop: "16px", padding: "20px", background: "var(--gold-bg)", borderRadius: "8px", border: "1px solid var(--gold)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>¡Cuestionario completado!</p>
            <p style={{ fontSize: "0.95rem", color: "var(--ink3)", lineHeight: 1.7 }}>
              Según sus respuestas, podremos evaluar su elegibilidad migratoria y recomendarle la mejor ruta para su caso.
              El siguiente paso es agendar su consulta estratégica por <strong>$50 USD</strong>.
            </p>
          </div>
        </div>
      )

      default: return null
    }
  }

  const canProceed = () => {
    if (steps[step] === "personal") return f.name && f.email
    return true
  }

  const handleNext = () => {
    if (step < total - 1) setStep(step + 1)
    else onComplete(f)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: "3px", borderRadius: "2px",
              background: i <= step ? "var(--gold)" : "var(--border)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "var(--gold)", textAlign: "right" }}>
        {step + 1} / {total}
      </p>

      {renderStep()}

      {/* Navigation */}
      <div style={{ display: "flex", gap: "10px", marginTop: "8px", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {step > 0 && (
            <button className="btn-ghost" onClick={() => setStep(step - 1)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 22px", fontSize: "0.65rem", cursor: "pointer" }}>
              <FaArrowLeft /> Anterior
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {step === 0 && (
            <button className="btn-ghost" onClick={onSkip} style={{ padding: "12px 22px", fontSize: "0.65rem", cursor: "pointer" }}>
              Saltar formulario
            </button>
          )}
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 22px", fontSize: "0.65rem", border: "none", cursor: "pointer", opacity: canProceed() ? 1 : 0.5 }}
          >
            {step < total - 1 ? <>Siguiente <FaArrowRight /></> : <>Finalizar <FaCheck /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
