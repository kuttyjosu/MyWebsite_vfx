import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Showreel", "Work", "Experience", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "KANTARA",
    role: "Lead Lighting Artist",
    studio: "Zebu FX",
    year: "2025",
    tags: ["Houdini", "Solaris", "USD"],
    color: "#C49A3C",
    desc: "Creature and environment-heavy show. Led the studio's first large-scale creature & environment lighting pipeline built on USD/Solaris.",
    stat: "Lighting Lead",
  },
  {
    title: "SNOW WHITE",
    role: "Lead Lighting Artist",
    studio: "MPC",
    year: "2024",
    tags: ["Katana", "Arnold", "Lookdev"],
    color: "#3CA4C4",
    desc: "Walt Disney Company project. Environment and character lighting across live-action CG integration sequences.",
    stat: "Disney",
  },
  {
    title: "PRIMATE",
    role: "Lead Lighting Artist",
    studio: "MPC",
    year: "2024",
    tags: ["Katana", "Lighting", "Creature"],
    color: "#8B6FD4",
    desc: "High-realistic animal and environment lighting. Hero creature integration with photorealistic CG.",
    stat: "Photoreal",
  },
  {
    title: "RESIDENT EVIL",
    role: "Lead Lighting Artist",
    studio: "MRX",
    year: "2022",
    tags: ["Houdini", "Arnold", "FX"],
    color: "#C43C3C",
    desc: "Environment, FX and atmospheric lighting. Dark tonal sequences with volumetric atmosphere and practical-match lighting.",
    stat: "Atmosphere",
  },
  {
    title: "MONSTER HUNTER",
    role: "Lead Lighting Artist",
    studio: "MRX",
    year: "2021",
    tags: ["Houdini", "Creature", "Env"],
    color: "#D46F3C",
    desc: "Creature, environment and FX lighting for large-scale action sequences. Multi-biome lighting continuity across full film.",
    stat: "Full Film",
  },
  {
    title: "HALO (SERIES)",
    role: "Lead Lighting Artist",
    studio: "MRX",
    year: "2022",
    tags: ["Houdini", "Sci-Fi", "Env"],
    color: "#3CC48B",
    desc: "Sci-fi environment lighting for the Paramount+ series. Futuristic interior and exterior CG world-building.",
    stat: "Paramount+",
  },
];

const TIMELINE = [
  { year: "2025", role: "Lead Lighting Artist", studio: "Zebu FX · Bangalore", project: "Kantara, Operation Safed Sagar" },
  { year: "2023", role: "Lead Lighting Artist", studio: "MPC · Bangalore", project: "Snow White, Primate, Poacher, Halo, Goosebumps", period: "Aug 2023 – Apr 2025" },
  { year: "2018", role: "Lead Lighting Artist", studio: "MRX · Bangalore", project: "Joe-Exotica, Resident Evil, Foundation, Monster Hunter, Highway Man, Shazam, Knight Fall", period: "Jan 2018 – Jul 2023" },
  { year: "2016", role: "Senior Lighting Artist", studio: "Anibrain · Pune", project: "Virtual Reality & VFX projects — Unreal Engine, Archviz, VR rides", period: "Apr 2016 – Nov 2018" },
  { year: "2015", role: "Lighting Artist", studio: "Riva Digital · Mumbai", project: "VFX feature films, ride films, game cinematics — Maya, Arnold, V-Ray", period: "Jun 2015 – Apr 2016" },
  { year: "2013", role: "Lighting Artist", studio: "Prana Studios · Mumbai", project: "Disney's Tinker Bell series, Marvel ride shows — PRMan, Maya", period: "Feb 2013 – Jan 2015" },
  { year: "2011", role: "Lighting Artist", studio: "Tata Elxsi · Mumbai", project: "DreamWorks 'How to Train Your Dragon', CG episodic, TV commercials", period: "Jun 2011 – Jan 2013" },
  { year: "2009", role: "CG Generalist", studio: "Next Education · Hyderabad", project: "E-learning CG projects as generalist and lighting artist", period: "Jun 2009 – May 2011" },
];

const SKILLS = [
  { name: "Lighting & Rendering", level: 97, items: ["Houdini / Solaris", "Katana", "Arnold", "RenderMan", "V-Ray"] },
  { name: "Lookdev & Shading", level: 93, items: ["USD Pipeline", "Substance Painter", "World Machine", "Meshroom"] },
  { name: "Real-Time & Previz", level: 85, items: ["Unreal Engine 5", "Archviz", "VR Rides", "Level Design"] },
  { name: "Leadership & Pipeline", level: 90, items: ["Lighting Dailies", "Team Supervision", "Hiring & Onboarding", "QC"] },
  { name: "FX & Atmosphere", level: 82, items: ["Volumetric FX", "Creature Lighting", "Env Lighting", "Compositing"] },
  { name: "Cross-Dept Collaboration", level: 88, items: ["VFX Supervisors", "Lookdev", "Comp", "Pipeline TD"] },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const scrollY = useScrollY();
  const [active, setActive] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showreel, setShowreel] = useState(false);

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#050507", color: "#E8E4DC", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #050507; } ::-webkit-scrollbar-thumb { background: #2a2520; border-radius: 2px; }
        html { scroll-behavior: smooth; }
        .glow-btn { position: relative; overflow: hidden; }
        .glow-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(196,154,60,0.15) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
        .glow-btn:hover::before { opacity: 1; }
        .card-hover { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(196,154,60,0.06); }
        .tag { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); color: rgba(232,228,220,0.5); font-weight: 400; }
        .skill-bar { height: 1px; background: rgba(255,255,255,0.06); border-radius: 1px; overflow: visible; position: relative; }
        .skill-fill { height: 100%; border-radius: 1px; position: absolute; top: 0; left: 0; transition: width 1.4s cubic-bezier(0.4,0,0.2,1); }
        .nav-link { position: relative; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(232,228,220,0.45); text-decoration: none; transition: color 0.3s; cursor: pointer; padding: 4px 0; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #C49A3C; transition: width 0.3s; }
        .nav-link:hover { color: rgba(232,228,220,0.9); }
        .nav-link:hover::after { width: 100%; }
        .cursor-glow { pointer-events: none; position: fixed; z-index: 9999; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(196,154,60,0.04) 0%, transparent 70%); transform: translate(-50%, -50%); transition: left 0.15s, top 0.15s; }
      `}</style>

      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px",
        background: scrollY > 60 ? "rgba(5,5,7,0.88)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(16px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C49A3C", boxShadow: "0 0 8px #C49A3C" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, letterSpacing: "0.12em", color: "rgba(232,228,220,0.8)" }}>JOSUKUTTY FRANCIS</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196,154,60,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(139,111,212,0.05) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(60,164,196,0.04) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,5,7,0.8) 100%)" }} />
        </div>

        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 2 === 0 ? 2 : 1,
            height: i % 2 === 0 ? 2 : 1,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#C49A3C" : i % 3 === 1 ? "#8B6FD4" : "#3CA4C4",
            opacity: 0.4 + (i * 0.04),
            left: `${8 + i * 8}%`,
            top: `${20 + (i * 13) % 60}%`,
            boxShadow: `0 0 ${4 + i}px currentColor`,
            animation: `float${i % 3} ${4 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}

        <style>{`
          @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes scanline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        `}</style>

        <div style={{ textAlign: "center", position: "relative", zIndex: 2, maxWidth: 900, padding: "0 24px" }}>
          <div style={{ animation: "fadeUp 1s ease 0.2s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 28, padding: "6px 20px", border: "1px solid rgba(196,154,60,0.25)", borderRadius: 40, background: "rgba(196,154,60,0.05)" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C49A3C", boxShadow: "0 0 6px #C49A3C", animation: "fadeIn 1s ease infinite alternate" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C49A3C", fontWeight: 400 }}>VFX Lighting Lead · 16 Years · Bangalore</span>
            </div>
          </div>

          <h1 style={{ animation: "fadeUp 1s ease 0.4s both", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(44px, 7vw, 86px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "#E8E4DC", marginBottom: 10 }}>
            JOSUKUTTY
          </h1>
          <h1 style={{ animation: "fadeUp 1s ease 0.5s both", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(44px, 7vw, 86px)", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 28, background: "linear-gradient(135deg, #C49A3C 0%, #E8C878 40%, #C49A3C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            FRANCIS
          </h1>

          <p style={{ animation: "fadeUp 1s ease 0.65s both", fontSize: "clamp(14px, 2vw, 17px)", color: "rgba(232,228,220,0.45)", letterSpacing: "0.04em", fontWeight: 300, marginBottom: 52, maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.7 }}>
            Experienced CG Artist specialising in lighting, look development and compositing.<br />Leading teams and crafting immersive visual experiences across VFX, VR and high-end CG.
          </p>

          <div style={{ animation: "fadeUp 1s ease 0.8s both", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="glow-btn" onClick={() => scrollTo("Showreel")} style={{
              padding: "14px 36px", border: "1px solid rgba(196,154,60,0.5)", borderRadius: 4, background: "rgba(196,154,60,0.08)", color: "#C49A3C", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s",
            }}>
              ▶ Watch Showreel
            </button>
            <button className="glow-btn" onClick={() => scrollTo("Work")} style={{
              padding: "14px 36px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, background: "transparent", color: "rgba(232,228,220,0.6)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s",
            }}>
              View Work
            </button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.3, animation: "fadeIn 1s ease 1.5s both" }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(196,154,60,0.6))", animation: "float0 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(5,5,7,0.6)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", gap: 0, animation: "fadeIn 1s ease 1s both" }}>
          {[["16+", "Years Experience"], ["8+", "VFX Studios"], ["20+", "Major Projects"], ["3", "Languages"]].map(([n, l], i) => (
            <div key={i} style={{ padding: "20px 48px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none", textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#C49A3C", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,228,220,0.3)", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWREEL */}
      <section id="showreel" style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,111,212,0.04) 0%, transparent 70%)" }} />
        <AnimSection style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A3C", display: "block", marginBottom: 16 }}>02 · Showreel</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.01em" }}>The Reel · 2024</h2>
          </div>
        </AnimSection>

        <AnimSection delay={0.2} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(139,111,212,0.05)" }}>
            {!showreel ? (
              <div style={{ position: "relative", background: "#0a0a0e", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => setShowreel(true)}>
                <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", opacity: 0.15 }}>
                  {["#C49A3C", "#8B6FD4", "#3CA4C4", "#D46F3C", "#C43C3C", "#3CC48B"].map((c, i) => (
                    <div key={i} style={{ background: `radial-gradient(ellipse at ${i % 2 === 0 ? "30%" : "70%"} 50%, ${c}33, transparent 70%)` }} />
                  ))}
                </div>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(196,154,60,0.08) 0%, transparent 70%)" }} />
                <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", border: "1px solid rgba(196,154,60,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "rgba(196,154,60,0.08)", backdropFilter: "blur(8px)" }}>
                    <span style={{ fontSize: 24, marginLeft: 6 }}>▶</span>
                  </div>
                  <p style={{ fontSize: 13, letterSpacing: "0.1em", color: "rgba(232,228,220,0.4)", textTransform: "uppercase" }}>Click to load showreel</p>
                  <p style={{ fontSize: 11, color: "rgba(196,154,60,0.5)", marginTop: 8, letterSpacing: "0.06em" }}>vimeo.com/artbyjosu</p>
                </div>
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.03 }}>
                  <div style={{ position: "absolute", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)", animation: "scanline 3s linear infinite" }} />
                </div>
              </div>
            ) : (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src="https://vimeo.com/artbyjosu"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Josukutty Francis VFX Showreel"
                />
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 32, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 32 }}>
            {[["Zebu FX", "Creature & Env"], ["MPC", "Disney · Featured"], ["MRX", "Sci-Fi · Horror"]].map(([studio, label]) => (
              <div key={studio} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "rgba(232,228,220,0.7)", marginBottom: 2 }}>{studio}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(196,154,60,0.7)", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* PROJECTS */}
      <section id="work" style={{ padding: "80px 48px 120px" }}>
        <AnimSection style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A3C", display: "block", marginBottom: 16 }}>03 · Featured Work</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 4vw, 54px)", letterSpacing: "-0.01em" }}>Selected Projects</h2>
            </div>
            <div style={{ fontSize: 12, color: "rgba(232,228,220,0.3)", letterSpacing: "0.08em" }}>2009 — 2025</div>
          </div>
        </AnimSection>

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 1, border: "1px solid rgba(255,255,255,0.04)", borderRadius: 8, overflow: "hidden" }}>
          {PROJECTS.map((p, i) => (
            <AnimSection key={p.title} delay={i * 0.08}>
              <div className="card-hover" style={{
                background: "#080810",
                padding: "40px 36px",
                borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                position: "relative",
                cursor: "pointer",
                height: "100%",
              }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.color}66, transparent)`, opacity: active === i ? 1 : 0, transition: "opacity 0.4s" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 4, background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(232,228,220,0.25)", textTransform: "uppercase" }}>{p.studio}</div>
                    <div style={{ fontSize: 12, color: "rgba(232,228,220,0.35)", marginTop: 2 }}>{p.year}</div>
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, letterSpacing: "0.02em", marginBottom: 8, color: active === i ? "#E8E4DC" : "rgba(232,228,220,0.85)", transition: "color 0.3s" }}>{p.title}</h3>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.color, marginBottom: 16, fontWeight: 400 }}>{p.role}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(232,228,220,0.4)", marginBottom: 24 }}>{p.desc}</p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ fontSize: 11, color: p.color, letterSpacing: "0.06em" }}>{p.stat}</div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" style={{ padding: "80px 48px 120px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 60% at 10% 50%, rgba(196,154,60,0.03) 0%, transparent 70%)" }} />
        <AnimSection style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A3C", display: "block", marginBottom: 16 }}>04 · Career</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 4vw, 54px)", letterSpacing: "-0.01em" }}>Experience Timeline</h2>
          </div>
        </AnimSection>

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div style={{ position: "absolute", left: 94, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, rgba(196,154,60,0.4), rgba(196,154,60,0.08) 80%, transparent)" }} />

          {TIMELINE.map((t, i) => (
            <AnimSection key={i} delay={i * 0.07}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 0, width: "100%", padding: "28px 0", borderBottom: i < TIMELINE.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                <div style={{ width: 70, flexShrink: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, color: i === 0 ? "#C49A3C" : "rgba(232,228,220,0.25)", paddingTop: 2 }}>{t.year}</div>
                <div style={{ position: "relative", marginLeft: 24, marginRight: 32, flexShrink: 0, marginTop: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#C49A3C" : "rgba(255,255,255,0.1)", boxShadow: i === 0 ? "0 0 12px #C49A3C, 0 0 24px rgba(196,154,60,0.3)" : "none", border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 400, color: "rgba(232,228,220,0.85)", marginBottom: 4 }}>{t.role}</div>
                    {t.period && <div style={{ fontSize: 10, color: "rgba(232,228,220,0.2)", letterSpacing: "0.08em" }}>{t.period}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: "#C49A3C", letterSpacing: "0.06em", marginBottom: 6, opacity: 0.8 }}>{t.studio}</div>
                  <div style={{ fontSize: 14, color: "rgba(232,228,220,0.3)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>{t.project}</div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 48px 120px" }}>
        <AnimSection style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A3C", display: "block", marginBottom: 16 }}>05 · Expertise</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 4vw, 54px)", letterSpacing: "-0.01em" }}>Technical Skills</h2>
          </div>
        </AnimSection>

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 2 }}>
          {SKILLS.map((s, i) => (
            <AnimSection key={s.name} delay={i * 0.1}>
              <SkillCard skill={s} index={i} />
            </AnimSection>
          ))}
        </div>

        <AnimSection delay={0.4} style={{ maxWidth: 1100, margin: "60px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {["Houdini", "Solaris", "Katana", "Unreal Engine", "Maya", "Meshroom", "World Machine", "Substance Painter", "RenderMan", "Arnold", "V-Ray"].map(sw => (
              <div key={sw} style={{ padding: "8px 18px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, fontSize: 11, letterSpacing: "0.1em", color: "rgba(232,228,220,0.35)", textTransform: "uppercase" }}>{sw}</div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 48px 100px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 80%, rgba(196,154,60,0.05) 0%, transparent 70%)" }} />
        <AnimSection style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A3C", display: "block", marginBottom: 24 }}>06 · Contact</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.01em", marginBottom: 20, lineHeight: 1.1 }}>
            Let's Create<br /><em>Something Epic</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(232,228,220,0.4)", lineHeight: 1.7, marginBottom: 52, maxWidth: 480, margin: "0 auto 52px", fontWeight: 300 }}>
            Open to Lead Lighting and Supervisory roles on ambitious feature film, episodic, and VFX productions worldwide.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            <a href="mailto:Kuttyjosu@gmail.com" style={{
              padding: "14px 36px", border: "1px solid rgba(196,154,60,0.5)", borderRadius: 4, background: "rgba(196,154,60,0.08)", color: "#C49A3C", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none",
            }}>
              Kuttyjosu@gmail.com
            </a>
            <a href="https://vimeo.com/artbyjosu" target="_blank" rel="noreferrer" style={{
              padding: "14px 36px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, background: "transparent", color: "rgba(232,228,220,0.5)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none",
            }}>
              Vimeo Portfolio
            </a>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "rgba(232,228,220,0.3)", letterSpacing: "0.08em" }}>📞 +(91) 9167684850 · Bangalore, India</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {[["LinkedIn", "https://linkedin.com"], ["Vimeo", "https://vimeo.com/artbyjosu"], ["Email", "mailto:Kuttyjosu@gmail.com"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,228,220,0.25)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#C49A3C"}
                onMouseLeave={e => e.target.style.color = "rgba(232,228,220,0.25)"}
              >{label}</a>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C49A3C" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "rgba(232,228,220,0.3)", letterSpacing: "0.08em" }}>JOSUKUTTY FRANCIS VFX</span>
        </div>
        <span style={{ fontSize: 11, color: "rgba(232,228,220,0.2)", letterSpacing: "0.08em" }}>© 2025 · VFX Lighting Lead · Bangalore</span>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map(l => (
            <span key={l} style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,228,220,0.2)", cursor: "pointer" }} onClick={() => scrollTo(l)}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.2);
  const colors = ["#C49A3C", "#8B6FD4", "#3CA4C4", "#D46F3C", "#C43C3C", "#3CC48B"];
  const color = colors[index % colors.length];

  return (
    <div ref={ref} style={{
      padding: "32px 28px",
      border: "1px solid rgba(255,255,255,0.04)",
      borderRadius: 4,
      background: "#080810",
      transition: "border-color 0.4s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${color}30`}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(232,228,220,0.75)" }}>{skill.name}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, color: color }}>{skill.level}%</span>
      </div>
      <div className="skill-bar" style={{ marginBottom: 20 }}>
        <div className="skill-fill" style={{ width: visible ? `${skill.level}%` : "0%", background: `linear-gradient(90deg, ${color}60, ${color})` }} />
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {skill.items.map(it => (
          <span key={it} className="tag">{it}</span>
        ))}
      </div>
    </div>
  );
}
