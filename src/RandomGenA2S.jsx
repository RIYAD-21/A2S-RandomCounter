import { useState } from "react";

const POOL = [1,2,3,4,5,6];

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
  numBase: { fontSize:"48px", fontWeight:"700", color:"#fff",
             lineHeight:1, transition:"transform 0.1s, opacity 0.1s",
             display:"block", letterSpacing:"8px" },
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
};

export default function DiceSequenceGenerator() {
  const [sequence, setSequence] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // 🔥 Fisher-Yates shuffle
  const generateSequence = () => {
    const arr = [...POOL];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  };

  const draw = () => {
    if (spinning) return;
    setSpinning(true);

    let ticks = 0;
    const iv = setInterval(() => {
      setSequence(generateSequence()); // fake spinning effect

      if (++ticks >= 20) {
        clearInterval(iv);
        setSequence(generateSequence()); // final result
        setSpinning(false);
      }
    }, 80);
  };

  const reset = () => {
    setSequence(null);
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        <div style={s.header}>
          <div style={s.badge}>A2S</div>
          <div>
            <h1 style={s.h1}>SEQUENCE GENERATOR</h1>
            <p style={s.sub}>Generate 6 random numbers</p>
          </div>
        </div>

        <div style={s.display}>
          <span style={{
            ...s.numBase,
            transform: spinning ? "scale(1.1)" : "scale(1)",
            opacity: spinning ? 0.5 : 1,
          }}>
            {sequence ?? "------"}
          </span>
          <p style={s.caption}>
            {spinning ? "Génération..." : "Clique pour générer"}
          </p>
        </div>

        <button
          style={{
            ...s.btnMain,
            background: spinning ? "#90C4E8" : "#0D7CC2",
            cursor: spinning ? "not-allowed" : "pointer",
          }}
          onClick={draw}
          disabled={spinning}
        >
          GENERATE SEQUENCE
        </button>

        <button
          style={s.btnReset}
          onClick={reset}
        >
          Reset
        </button>

      </div>
    </div>
  );
}