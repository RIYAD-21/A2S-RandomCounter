


import { useState } from "react";

const POOL = [0,1,2,3,4,5];

const s = {
  page:    { minHeight:"100vh", background:"#F0F6FB", display:"flex",
             alignItems:"center", justifyContent:"center", padding:"24px",
             fontFamily:"'Segoe UI', sans-serif" },
  card:    { width:"100%", maxWidth:"420px", background:"#fff",
             borderRadius:"20px", boxShadow:"0 8px 32px rgba(13,124,194,0.12)",
             padding:"28px" },
  header:  { display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" },
  badge:   { width:"44px", height:"44px", borderRadius:"50%",
             background:"#E6F1FB", display:"flex", alignItems:"center",
             justifyContent:"center", color:"#0D7CC2",
             fontWeight:"700", fontSize:"12px", flexShrink:0 },
  h1:      { margin:0, fontSize:"20px", fontWeight:"700",
             color:"#0D7CC2", letterSpacing:"1px" },
  sub:     { margin:0, fontSize:"12px", color:"#94A3B8" },
  display: { background:"linear-gradient(135deg,#0D7CC2,#1E9FE8)",
             borderRadius:"16px", padding:"36px 16px", textAlign:"center",
             marginBottom:"20px", position:"relative", overflow:"hidden" },
  numBase: { fontSize:"88px", fontWeight:"700", color:"#fff",
             lineHeight:1, transition:"transform 0.1s, opacity 0.1s",
             display:"block" },
  caption: { fontSize:"11px", color:"rgba(255,255,255,0.75)",
             letterSpacing:"3px", marginTop:"8px", textTransform:"uppercase" },
  btnMain: { width:"100%", background:"#0D7CC2", color:"#fff", border:"none",
             borderRadius:"12px", padding:"14px", fontSize:"16px",
             fontWeight:"700", letterSpacing:"1px", cursor:"pointer",
             marginBottom:"10px", transition:"background 0.2s" },
  btnReset:{ width:"100%", background:"transparent", color:"#0D7CC2",
             border:"1.5px solid #0D7CC2", borderRadius:"12px", padding:"10px",
             fontSize:"13px", cursor:"pointer", marginBottom:"20px",
             transition:"background 0.2s" },
  poolLbl: { fontSize:"10px", color:"#94A3B8", letterSpacing:"2px",
             textTransform:"uppercase", marginBottom:"6px" },
  counter: { fontSize:"11px", color:"#94A3B8", textAlign:"right",
             marginBottom:"8px" },
  pool:    { display:"flex", flexWrap:"wrap", gap:"6px" },
};

export default function A2SRandomPicker() {
  const [remaining, setRemaining] = useState([...POOL]);
  const [drawn,     setDrawn]     = useState([]);
  const [current,   setCurrent]   = useState(null);
  const [spinning,  setSpinning]  = useState(false);

  const draw = () => {
    if (!remaining.length || spinning) return;
    setSpinning(true);
    const chosen = remaining[Math.floor(Math.random() * remaining.length)];
    let ticks = 0;
    const iv = setInterval(() => {
      setCurrent(remaining[Math.floor(Math.random() * remaining.length)]);
      if (++ticks >= 20) {
        clearInterval(iv);
        setCurrent(chosen);
        setRemaining(r => r.filter(n => n !== chosen));
        setDrawn(d => [...d, chosen]);
        setSpinning(false);
      }
    }, 60);
  };

  const reset = () => { setRemaining([...POOL]); setDrawn([]); setCurrent(null); };

  const statusText = !drawn.length
    ? "Prêt pour le tirage"
    : !remaining.length
    ? "Tous les numéros tirés !"
    : "Numéro tiré avec succès";

  return (
    <div style={s.page}>
      <div style={s.card}>

        <div style={s.header}>
          <div style={s.badge}>A2S</div>
          <div>
            <h1 style={s.h1}>TIRAGE AU SORT</h1>
            <p style={s.sub}>A2S Junior Entreprise · INPT</p>
          </div>
        </div>

        <div style={s.display}>
          <span style={{
            ...s.numBase,
            transform: spinning ? "scale(1.12)" : "scale(1)",
            opacity:   spinning ? 0.45 : 1,
          }}>
            {current ?? "—"}
          </span>
          <p style={s.caption}>{statusText}</p>
        </div>

        <button
          style={{
            ...s.btnMain,
            background: (!remaining.length || spinning) ? "#90C4E8" : "#0D7CC2",
            cursor:     (!remaining.length || spinning) ? "not-allowed" : "pointer",
          }}
          onMouseEnter={e => { if (remaining.length && !spinning) e.target.style.background = "#0B6AAD"; }}
          onMouseLeave={e => { if (remaining.length && !spinning) e.target.style.background = "#0D7CC2"; }}
          onClick={draw}
          disabled={!remaining.length || spinning}
        >
          TIRER UN NUMÉRO
        </button>

        <button
          style={s.btnReset}
          onMouseEnter={e => e.target.style.background = "#E6F1FB"}
          onMouseLeave={e => e.target.style.background = "transparent"}
          onClick={reset}
        >
          Réinitialiser le tirage
        </button>

        <p style={s.poolLbl}>Numéros disponibles</p>
        <p style={s.counter}>{remaining.length} / {POOL.length} restants</p>
        <div style={s.pool}>
          {POOL.map(n => {
            const isLast    = n === drawn.at(-1);
            const isDrawn   = drawn.includes(n);
            const tagStyle  = {
              padding:"4px 10px", borderRadius:"20px", fontSize:"13px",
              fontWeight:"500", transition:"all 0.2s",
              background: isLast  ? "#0D7CC2"
                        : isDrawn ? "#B5D4F4"
                        : "#E6F1FB",
              color:      isLast  ? "#fff"
                        : isDrawn ? "#185FA5"
                        : "#0D7CC2",
              textDecoration: (isDrawn && !isLast) ? "line-through" : "none",
              opacity:        (isDrawn && !isLast) ? 0.55 : 1,
            };
            return <span key={n} style={tagStyle}>{n}</span>;
          })}
        </div>

      </div>
    </div>
  );
}