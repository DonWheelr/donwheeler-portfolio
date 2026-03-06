"use client";

import type { NextPage } from "next";

const projects = [
  {
    id: 1,
    title: "Pizza POS System",
    description:
      "Full-stack point-of-sale application featuring four distinct real-time interfaces: Customer ordering, Kitchen display, Register checkout, and Manager monitor. Architected to simulate the command-and-control environments built for hospital networks.",
    tags: ["Next.js 14", "React", "Prisma", "Tailwind CSS", "PostgreSQL"],
    live: "https://pizza-web-ui.vercel.app/",
    status: "complete",
    highlight: "4 real-time interfaces",
  },
  {
    id: 2,
    title: "react_ui_showcase",
    description:
      "A collection of frontend builds demonstrating progression from foundational UI components to full application builds. Covers modern React patterns, responsive layouts, and API integration.",
    tags: ["React", "JavaScript", "CSS", "REST APIs"],
    live: "https://don-w-internship.vercel.app/",
    status: "complete",
    highlight: "Full internship track",
  },
  {
    id: 3,
    title: "Nike E-Commerce Store",
    description:
      "A high-fidelity e-commerce storefront inspired by Nike's design language. Features product browsing, filtering, cart management, and a checkout flow — built with performance and clean UX as the primary constraints.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    live: "https://ecommerce-nike-mu.vercel.app/",
    status: "complete",
    highlight: "Full cart & checkout flow",
  },
];

const skills = [
  { category: "Frontend", items: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"] },
  { category: "Infrastructure", items: ["PowerShell", "VBScript", "Network Automation", "Cisco"] },
  { category: "Practices", items: ["3-2-1 Backup", "DR Testing", "Documentation", "AI-Assisted Dev"] },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,250,249,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 56 }}>
          <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>
            Don Wheeler
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Projects", "Skills", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: 14, color: "var(--text-secondary)",
                textDecoration: "none", transition: "color 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >{item}</a>
            ))}
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
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
                Open to new opportunities
              </span>
            </div>
          </div>

          <h1 className="fade-up fade-up-2" style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}>
            Full-Stack Engineer.<br />
            <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
              20 years of building systems<br />that don&apos;t fail.
            </span>
          </h1>

          <p className="fade-up fade-up-3" style={{
            fontSize: 17, color: "var(--text-secondary)",
            maxWidth: 560, lineHeight: 1.7, marginBottom: 32,
          }}>
            Infrastructure specialist turned full-stack developer. I spent two decades keeping
            banking and healthcare systems alive — now I build modern web applications with
            the same discipline: tested, documented, and ready for scale.
          </p>

          <div className="fade-up fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#projects" style={{
              background: "var(--accent)", color: "#fff",
              padding: "10px 22px", borderRadius: 8,
              fontSize: 14, fontWeight: 500, textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "var(--accent)")}
            >
              View Projects
            </a>
            <a href="https://github.com/slowheelerfam-netizen" target="_blank" rel="noopener noreferrer"
              style={{
                background: "transparent", color: "var(--text-primary)",
                padding: "10px 22px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                border: "1px solid var(--border)",
                transition: "border-color 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "#a3a3a3")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              GitHub →
            </a>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{ borderTop: "1px solid var(--border)", marginBottom: 72 }} />

        {/* ── Projects ── */}
        <section id="projects" style={{ marginBottom: 80 }}>
          <div className="fade-up fade-up-1" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: 8 }}>Selected Work</p>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Projects
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {projects.map((project, i) => (
              <div key={project.id} className={`fade-up fade-up-${i + 2}`} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "28px 32px",
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
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", fontFamily: project.title.includes('_') ? 'DM Mono, monospace' : 'inherit' }}>
                        {project.title}
                      </h3>
                      <span style={{
                        fontSize: 11, fontWeight: 500, color: "var(--green)",
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        borderRadius: 999, padding: "2px 8px",
                      }}>
                        {project.highlight}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: 13, color: "var(--accent)", fontWeight: 500,
                          textDecoration: "none", border: "1px solid #bfdbfe",
                          borderRadius: 6, padding: "5px 12px",
                          background: "var(--accent-light)",
                        }}>
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 16 }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 12, color: "var(--tag-text)", background: "var(--tag-bg)",
                      borderRadius: 5, padding: "3px 9px", fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: 8 }}>Capabilities</p>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Skills
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {skills.map((group) => (
              <div key={group.category} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "20px 22px",
              }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)",
                  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
                  {group.category}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex",
                      alignItems: "center", gap: 7 }}>
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

        {/* ── About strip ── */}
        <section style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 12, padding: "32px 36px", marginBottom: 80,
          display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ maxWidth: 520 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: 10 }}>Background</p>
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
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: "var(--text-primary)",
            letterSpacing: "-0.01em", marginBottom: 12 }}>
            Let&apos;s work together.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28 }}>
            I&apos;m currently open to full-time and contract roles.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:donwFrontendDev@gmail.com" style={{
              background: "var(--accent)", color: "#fff",
              padding: "11px 26px", borderRadius: 8,
              fontSize: 14, fontWeight: 500, textDecoration: "none",
            }}>
              Send an Email
            </a>
            <a href="https://github.com/slowheelerfam-netizen" target="_blank" rel="noopener noreferrer"
              style={{
                background: "transparent", color: "var(--text-primary)",
                padding: "11px 26px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                border: "1px solid var(--border)",
              }}>
              GitHub Profile
            </a>
          </div>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            © 2025 Don Wheeler
          </span>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </footer>
    </main>
  );
}
