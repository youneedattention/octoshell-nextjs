export default function PreviewHero() {
  const options = [
    { id: "A", pos: "center center", label: "中央（现在）" },
    { id: "B", pos: "left center",   label: "左侧居中" },
    { id: "C", pos: "20% center",    label: "偏左20%" },
    { id: "D", pos: "center 20%",    label: "偏上20%" },
    { id: "E", pos: "30% 30%",       label: "左上角" },
  ];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {options.map(({ id, pos, label }) => (
        <div key={id} style={{ position: "relative", width: "100%", height: "100svh" }}>
          <img
            src="/hero.png"
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: pos,
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.2), rgba(0,0,0,0.65))"
          }} />
          <div style={{
            position: "absolute", bottom: 40, left: 20,
            color: "#fff", fontFamily: "sans-serif"
          }}>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>{id}</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 13, opacity: 0.5, marginTop: 4 }}>{pos}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
