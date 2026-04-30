"use client";

import { useState, useEffect } from "react";
import Confetti from 'react-confetti';

const projects = [
  {
    id: 4,
    title: "MSP Security & Compliance Platform UI",
    description: "Frontend UI for a platform that unifies IT operations, compliance tracking, and network visibility into a single system.",
    tags: ["React", "TypeScript", "UI/UX", "Data Visualization"],
    live: "#",
    highlight: "Walkthrough available",
  },
  {
    id: 5,
    title: "Screen Art — Multi-Device Interactive Platform",
    description: "Real-time multi-device application connecting TV and mobile interfaces for collaborative, QR-driven user interaction.",
    tags: ["React", "WebSockets", "QR Codes", "Real-time UI"],
    live: "https://screen-art-io6w.vercel.app/",
    highlight: "Codebase: Private",
  },
  {
    id: 1,
    title: "Pizza POS — Full Stack Ordering System",
    description: "Full stack ordering system with structured UI workflows, state management, and user interaction handling.",
    tags: ["Next.js 14", "React", "Prisma", "Tailwind CSS", "PostgreSQL"],
    live: "https://pizza-web-ui.vercel.app/",
    highlight: "4 real-time interfaces",
  },
  {
    id: 3,
    title: "Nike Store — E-Commerce Frontend",
    description: "Responsive storefront UI focused on layout, product display, and clean user experience patterns.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    live: "https://ecommerce-nike-mu.vercel.app/",
    highlight: "Full cart & checkout flow",
  },
  {
    id: 2,
    title: "React UI Showcase — Component Library",
    description: "Reusable component patterns demonstrating layout, styling, and interactive UI behavior.",
    tags: ["React", "JavaScript", "CSS", "REST APIs"],
    live: "https://don-w-internship.vercel.app/",
    highlight: "Full internship track",
  },
];

const skills = [
  { category: "Frontend", items: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"] },
  { category: "Infrastructure", items: ["PowerShell", "VBScript", "Network Automation", "Cisco"] },
  { category: "Practices", items: ["3-2-1 Backup", "DR Testing", "Documentation", "AI-Assisted Dev"] },
];

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ email: "", subject: "", message: "", cc: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);

  useEffect(() => {
    if (sent) {
      setShowBalloon(true);
      // Balloon rises for 2s, then pops
      const popTimeout = setTimeout(() => {
        setShowBalloon(false);
        setShowConfetti(true);
      }, 2000);

      // Confetti runs for 5s, then everything resets
      const confettiTimeout = setTimeout(() => {
        setShowConfetti(false);
        setSent(false);
        onClose();
        setForm({ email: "", subject: "", message: "", cc: "" });
      }, 7000);

      return () => {
        clearTimeout(popTimeout);
        clearTimeout(confettiTimeout);
      };
    }
  }, [sent, onClose]);

  const handleSubmit = async () => {
    if (!form.email || !form.message) {
      setError("Please fill in your email and message.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xvzwpjjo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: form.email, cc: form.cc, subject: form.subject, message: form.message }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes balloonRise {
          from { transform: translateY(100vh) scale(0.8); opacity: 0; }
          to   { transform: translateY(50vh) scale(1); opacity: 1; }
        }
        @keyframes balloonPop {
          from { transform: translateY(50vh) scale(1); opacity: 1; }
          to   { transform: translateY(50vh) scale(1.2); opacity: 0; }
        }
        .modal-input:focus {
          border-color: #2e6da4 !important;
          box-shadow: 0 0 0 3px rgba(46,109,164,0.1);
        }
      `}</style>

      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: sent ? "rgba(10,20,40,0.0)" : "rgba(10,20,40,0.45)",
          backdropFilter: sent ? "blur(0px)" : "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
          animation: "fadeInOverlay 0.25s ease forwards",
          transition: "background .5s, backdrop-filter .5s",
        }}
      >
        {showBalloon && (
          <div style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            animation: `balloonRise 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
          }}>
            <div style={{
              width: 75,
              height: 90,
              background: "#ef4444",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              fontSize: "14px",
              fontWeight: "bold",
              position: "relative",
            }}>
              USPS
              <div style={{ position: "absolute", bottom: -5, left: "calc(50% - 2.5px)", width: 5, height: 5, background: "#ef4444", borderRadius: "50%" }} />
            </div>
            <div style={{ position: "absolute", top: 90, left: "calc(50% - 1px)", width: 2, height: 50, background: "#a1a1aa" }} />
            <div style={{ position: "absolute", top: 140, left: "calc(50% - 15px)", width: 30, height: 20, background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: 2 }}>
              <div style={{ position: "absolute", top: 2, right: 2, width: 6, height: 6, background: "#fbbf24", borderRadius: "50%" }} />
            </div>
          </div>
        )}

        {/* Modal card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "40px 40px 36px",
            width: "100%",
            maxWidth: 480,
            boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 24px rgba(0,0,0,0.08)",
            animation: "slideUpModal 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            position: "relative",
            transition: "opacity 1s ease, transform 1s ease",
            opacity: sent ? 0 : 1,
            transform: sent ? "scale(0.95)" : "scale(1)",
            pointerEvents: sent ? "none" : "auto",
          }}
        >
            <>
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: 14, right: 14,
                  background: "none", border: "none", cursor: "pointer",
                  color: "#a8a8a4", fontSize: 18, lineHeight: 1,
                  width: 32, height: 32, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s, color 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#f4f4f2";
                  (e.currentTarget as HTMLButtonElement).style.color = "#1a1a18";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                  (e.currentTarget as HTMLButtonElement).style.color = "#a8a8a4";
                }}
              >✕</button>
              <div style={{ marginBottom: 28 }}>
                <p style={{
                  fontSize: 11, fontWeight: 600, color: "#2e6da4",
                  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
                }}>Discuss a Project</p>
                <p style={{ fontSize: 14, color: "#6b6b67", lineHeight: 1.65 }}>
                  If you’re working on a dashboard, internal tool, or frontend project and need help building or improving it, feel free to reach out.
                  <br/><br/>
                  Available for part-time or contract work.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { key: "email", label: "Your Email", type: "email", placeholder: "you@example.com" },
                  { key: "cc", label: "CC", type: "email", placeholder: "add others to the conversation" },
                  { key: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label style={{
                      fontSize: 12, fontWeight: 500, color: "#3d3d39",
                      display: "block", marginBottom: 5,
                    }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="modal-input"
                      style={{
                        width: "100%", padding: "10px 14px",
                        border: "1.5px solid #e5e5e3", borderRadius: 9,
                        fontSize: 14, color: "#1a1a18", outline: "none",
                        fontFamily: "DM Sans, sans-serif",
                        boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 500, color: "#3d3d39",
                    display: "block", marginBottom: 5,
                  }}>Message</label>
                  <textarea
                    placeholder="Tell me about the role or project…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="modal-input"
                    style={{
                      width: "100%", padding: "10px 14px",
                      border: "1.5px solid #e5e5e3", borderRadius: 9,
                      fontSize: 14, color: "#1a1a18", outline: "none",
                      fontFamily: "DM Sans, sans-serif",
                      resize: "vertical", boxSizing: "border-box",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: 13, color: "#dc2626", marginTop: -4 }}>{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    background: sending ? "#93c5fd" : "#1d4ed8", color: "#fff",
                    padding: "12px 24px", borderRadius: 9,
                    fontSize: 14, fontWeight: 600,
                    border: "none", cursor: sending ? "not-allowed" : "pointer",
                    marginTop: 4,
                    fontFamily: "DM Sans, sans-serif",
                    transition: "background 0.15s, transform 0.1s",
                    letterSpacing: "0.01em",
                  }}
                  onMouseOver={(e) => { if (!sending) (e.currentTarget.style.background = "#1e40af"); }}
                  onMouseOut={(e) => { if (!sending) (e.currentTarget.style.background = "#1d4ed8"); }}
                  onMouseDown={(e) => { if (!sending) (e.currentTarget.style.transform = "scale(0.98)"); }}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {sending ? "Sending…" : "Send Message →"}
                </button>
              </div>
            </>
          </div>
      </div>
    </>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,250,249,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>Don Wheeler</span>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["Projects", "Skills"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: 14, color: "var(--text-secondary)",
                textDecoration: "none", transition: "color 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >{item}</a>
            ))}
            <button
              onClick={() => setModalOpen(true)}
              style={{
                fontSize: 14, color: "var(--text-secondary)", background: "none",
                border: "none", cursor: "pointer", padding: 0,
                fontFamily: "DM Sans, sans-serif", transition: "color 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >Contact</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Hero ── */}
        <section style={{ padding: "80px 0 72px" }}>
          <div className="fade-up fade-up-1">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--accent-light)", border: "1px solid #bfdbfe",
              borderRadius: 999, padding: "4px 12px", marginBottom: 20,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>Open to new opportunities</span>
            </div>
          </div>

          <h1 className="fade-up fade-up-2" style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600, lineHeight: 1.15,
            color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 20,
          }}>
            Frontend Developer for Business-Critical Interfaces.<br />
            <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
              Former MCSE systems engineer building modern web applications with a focus on reliability, 
              clarity, and real-world operations.
            </span>
          </h1>

          <p className="fade-up fade-up-3" style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 560, lineHeight: 1.7, marginBottom: 32,
          }}>
            I design and build frontend interfaces for dashboards, internal tools, and operational
             systems — where performance, usability, and accuracy matter.
          </p>

          <div className="fade-up fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#projects" style={{
              background: "var(--accent)", color: "#fff", padding: "10px 22px",
              borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >View Projects</a>
            <a href="https://github.com/slowheelerfam-netizen" target="_blank" rel="noopener noreferrer"
              style={{
                background: "transparent", color: "var(--text-primary)",
                padding: "10px 22px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                border: "1px solid var(--border)", transition: "border-color 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "#a3a3a3")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >GitHub →</a>
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--border)", marginBottom: 72 }} />

        {/* ── Projects ── */}
        <section id="projects" style={{ marginBottom: 80 }}>
          <div className="fade-up fade-up-1" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)",
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Selected Work</p>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Projects</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {projects.map((project, i) => (
              <div key={project.id} className={`fade-up fade-up-${i + 2}`} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "28px 32px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#c7c7c3";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
              >
                <div style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)",
                      fontFamily: project.title.includes("_") ? "DM Mono, monospace" : "inherit" }}>
                      {project.title}
                    </h3>
                    <span style={{
                      fontSize: 11, fontWeight: 500, color: "var(--green)",
                      background: "#f0fdf4", border: "1px solid #bbf7d0",
                      borderRadius: 999, padding: "2px 8px",
                    }}>{project.highlight}</span>
                  </div>
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontSize: 13, color: "var(--accent)", fontWeight: 500,
                      textDecoration: "none", border: "1px solid #bfdbfe",
                      borderRadius: 6, padding: "5px 12px", background: "var(--accent-light)",
                    }}>Live Demo ↗</a>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 16 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 12, color: "var(--tag-text)", background: "var(--tag-bg)",
                      borderRadius: 5, padding: "3px 9px", fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)",
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Capabilities</p>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Skills</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {skills.map((group) => (
              <div key={group.category} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "20px 22px",
              }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)",
                  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>{group.category}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ fontSize: 13, color: "var(--text-secondary)",
                      display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%",
                        background: "var(--border)", display: "inline-block", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── About ── */}
        <section style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 12, padding: "32px 36px", marginBottom: 80,
          display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ maxWidth: 520 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)",
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Background</p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Twenty years managing the digital infrastructure of banks and hospitals taught me one thing:
              systems must be <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>reliable before they are clever</strong>.
              I bring that discipline to every line of code — whether it&apos;s a PowerShell automation script
              for 5,000 remote devices or a React component that handles edge cases gracefully.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
            {[
              { label: "Years Experience", value: "20+" },
              { label: "Industries", value: "Banking · Healthcare" },
              { label: "Stack", value: "Next.js · React · Node" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" style={{ marginBottom: 80, textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)",
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: "var(--text-primary)",
            letterSpacing: "-0.01em", marginBottom: 12 }}>
            Let&apos;s build the future together.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28 }}>
            I can&apos;t wait to hear from you. I&apos;m currently open to full-time and contract roles.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "var(--accent)", color: "#fff", padding: "11px 26px",
                borderRadius: 8, fontSize: 14, fontWeight: 500,
                border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >Send a Message</button>
            <a href="https://github.com/slowheelerfam-netizen" target="_blank" rel="noopener noreferrer"
              style={{
                background: "transparent", color: "var(--text-primary)",
                padding: "11px 26px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                border: "1px solid var(--border)",
              }}>GitHub Profile</a>
          </div>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>© 2025 Don Wheeler</span>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </footer>
    </main>
  );
}
