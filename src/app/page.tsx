"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 6,
    title: "Skinstric — AI Skincare Diagnostic Platform",
    description:
      "A ground-up build of a Figma design for an AI-powered skincare brand. Implemented a minimalist aesthetic using utility-first Tailwind CSS and engineered custom Camera API permission handling to gracefully guide users through browser security dialogs.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Camera API"],
    live: "https://skinstric-omega-ebon.vercel.app/",
    highlight: "Figma-to-Code",
    caseStudy: {
      challenge: "Build a 1:1 identical clone of a Figma design for an AI skincare brand with zero starter code.",
      technicalWin: "Used a utility-first Tailwind CSS approach to lock in a minimalist aesthetic without the overhead of heavy frameworks.",
      seniorMoment: "Identified a silent failure in the camera diagnostic tool on certain browsers. I engineered a custom error-handling flow that guided users to fix their own permissions, preventing user drop-off.",
    },
  },
  {
    id: 7,
    title: "Belmont Terrace — Community Water Utility Site",
    description:
      "Full utility management site for an 87-home member-owned water cooperative in Sebastopol, CA. Covers bill payment, a compliance document archive, system status, and a community calendar.",
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "TypeScript"],
    live: "https://belmont-terrace.vercel.app/",
    highlight: "Real client · Pending rollout",
    caseStudy: {
      challenge: "Build a complete digital presence for a member-owned water utility with no existing site — covering regulatory compliance documents, bill payment, and community communications.",
      technicalWin: "Integrated Stripe for bill payment and built a category-based document archive organizing regulatory materials (bylaws, consumer confidence reports, financial statements, meeting minutes) into a clean, filterable structure.",
      seniorMoment: "Recognized early that a regulated utility has strict public records obligations. Rather than a generic file dump, I architected the document system around compliance categories — so members can find required disclosures quickly and the board stays audit-ready.",
    },
  },
  {
    id: 4,
    title: "MSP Security & Compliance Platform UI",
    description:
      "Frontend UI for a private platform that brings IT operations, compliance tracking, and network visibility together in one operational workspace.",
    tags: ["React", "TypeScript", "UI/UX", "Data Visualization"],
    live: "",
    highlight: "Private repo",
    ctaLabel: "Ask About This Project",
    privateDemo: true,
    videos: [
      { src: "/screenshots/monitor.mp4", label: "Monitor Dashboard" },
      { src: "/screenshots/tech.mp4", label: "Tech Overview" },
    ],
  },
  {
    id: 5,
    title: "Screen Art — Multi-Device Interactive Platform",
    description:
      "Real-time multi-device application connecting TV and mobile interfaces for collaborative, QR-driven user interaction.",
    tags: ["React", "WebSockets", "QR Codes", "Real-time UI"],
    live: "https://screen-art-io6w.vercel.app/",
    highlight: "Codebase: Private",
  },
  {
    id: 1,
    title: "Pizza POS — Full Stack Ordering System",
    description:
      "Full stack ordering system with structured UI workflows, state management, and user interaction handling.",
    tags: ["Next.js 14", "React", "Prisma", "Tailwind CSS", "PostgreSQL"],
    live: "https://pizza-web-ui.vercel.app/",
    highlight: "4 real-time interfaces",
  },
  {
    id: 3,
    title: "Nike Store — E-Commerce Frontend",
    description:
      "Responsive storefront UI focused on layout, product display, and clean user experience patterns.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    live: "https://ecommerce-nike-mu.vercel.app/",
    highlight: "Full cart & checkout flow",
  },
  {
    id: 2,
    title: "React UI Showcase — Component Library",
    description:
      "Reusable component patterns demonstrating layout, styling, and interactive UI behavior.",
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

const CLOSE_DURATION_MS = 280;
const SUCCESS_MODAL_FADE_MS = 260;

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "1px solid var(--border)",
        borderRadius: 999,
        background: "var(--bg-card)",
        color: "var(--text-secondary)",
        padding: "7px 12px",
        cursor: "pointer",
        fontFamily: "DM Sans, sans-serif",
        fontSize: 13,
        transition: "border-color 0.2s, color 0.2s, background 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-border)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--accent-light)",
          color: "var(--accent)",
          fontSize: 11,
          lineHeight: 1,
        }}
      >
        {isDark ? "☾" : "☀"}
      </span>
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ email: "", subject: "", message: "", cc: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [shouldRender, setShouldRender] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const [showCard, setShowCard] = useState(open);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const submitCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (open && (isClosing || sending)) {
      return;
    }

    if (open) {
      setShouldRender(true);
      setIsClosing(false);
      setShowCard(true);
      return;
    }

    if (!shouldRender) {
      return;
    }

    setIsClosing(true);
    const timeout = window.setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      setError("");
      setShowCard(false);
    }, CLOSE_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [isClosing, open, sending, shouldRender]);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    lastActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimeout = window.setTimeout(() => {
      emailInputRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastActiveElementRef.current?.focus();
    };
  }, [shouldRender, sending]);

  useEffect(() => {
    return () => {
      if (submitCloseTimeoutRef.current !== null) {
        window.clearTimeout(submitCloseTimeoutRef.current);
      }
    };
  }, []);

  const requestClose = () => {
    if (sending) {
      return;
    }
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.email || !form.message) {
      setError("Please fill in your email and message.");
      return;
    }

    setSending(true);
    setError("");
    setIsClosing(true);
    submitCloseTimeoutRef.current = window.setTimeout(() => {
      setShowCard(false);
      setShouldRender(false);
    }, SUCCESS_MODAL_FADE_MS);

    try {
      const res = await fetch("https://formspree.io/f/xvzwpjjo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          cc: form.cc,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!res.ok) {
        if (submitCloseTimeoutRef.current !== null) {
          window.clearTimeout(submitCloseTimeoutRef.current);
          submitCloseTimeoutRef.current = null;
        }
        setShouldRender(true);
        setShowCard(true);
        setIsClosing(false);
        setError("Something went wrong. Please try again.");
        return;
      }

      if (submitCloseTimeoutRef.current !== null) {
        window.clearTimeout(submitCloseTimeoutRef.current);
        submitCloseTimeoutRef.current = null;
      }
      setError("");
      setForm({ email: "", subject: "", message: "", cc: "" });
      setShowCard(false);
      setShouldRender(false);
      onClose();
    } catch {
      if (submitCloseTimeoutRef.current !== null) {
        window.clearTimeout(submitCloseTimeoutRef.current);
        submitCloseTimeoutRef.current = null;
      }
      setShouldRender(true);
      setShowCard(true);
      setIsClosing(false);
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div
        onClick={requestClose}
        aria-hidden={!open}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "var(--overlay-bg)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          animation: `${isClosing ? "modalOverlayOut" : "modalOverlayIn"} ${CLOSE_DURATION_MS}ms ease forwards`,
        }}
      >
        {showCard ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "40px 40px 36px",
              width: "100%",
              maxWidth: 480,
              boxShadow: "var(--modal-shadow)",
              position: "relative",
              pointerEvents: sending ? "none" : "auto",
              animation: `${isClosing ? "modalCardOut" : "modalCardIn"} ${CLOSE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close contact modal"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: 18,
              lineHeight: 1,
              width: 32,
              height: 32,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s, color 0.15s",
              fontFamily: "inherit",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--close-hover-bg)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            ✕
          </button>

          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 6,
              }}
            >
              Discuss a Project
            </p>
            <p
              id="contact-modal-title"
              style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}
            >
              If you&apos;re working on a dashboard, internal tool, or frontend project and need help
              building or improving it, feel free to reach out.
              <br />
              <br />
              Available for part-time or contract work.
              <br />
              <br />
              If you&apos;d like access to the MSP Security &amp; Compliance demo environment, mention
              it in your message and I&apos;ll follow up with the walkthrough details.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { key: "email", label: "Your Email", type: "email", placeholder: "you@example.com" },
              { key: "cc", label: "CC", type: "email", placeholder: "add others to the conversation" },
              { key: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--tag-text)",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  {label}
                </label>
                <input
                  ref={key === "email" ? emailInputRef : undefined}
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="modal-input"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid var(--input-border)",
                    borderRadius: 9,
                    fontSize: 14,
                    color: "var(--text-primary)",
                    outline: "none",
                    fontFamily: "DM Sans, sans-serif",
                    boxSizing: "border-box",
                    transition: "border-color 0.15s, box-shadow 0.15s, background 0.2s",
                  }}
                />
              </div>
            ))}

            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--tag-text)",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Message
              </label>
              <textarea
                placeholder="Tell me about the role or project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="modal-input"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid var(--input-border)",
                  borderRadius: 9,
                  fontSize: 14,
                  color: "var(--text-primary)",
                  outline: "none",
                  fontFamily: "DM Sans, sans-serif",
                  resize: "vertical",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s, box-shadow 0.15s, background 0.2s",
                }}
              />
            </div>

            {error ? <p style={{ fontSize: 13, color: "#dc2626", marginTop: -4 }}>{error}</p> : null}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={sending}
              style={{
                background: sending ? "#93c5fd" : "var(--accent)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: sending ? "not-allowed" : "pointer",
                marginTop: 4,
                fontFamily: "DM Sans, sans-serif",
                transition: "background 0.15s, transform 0.1s",
                letterSpacing: "0.01em",
              }}
              onMouseOver={(e) => {
                if (!sending) {
                  e.currentTarget.style.background = "var(--accent-hover)";
                }
              }}
              onMouseOut={(e) => {
                if (!sending) {
                  e.currentTarget.style.background = "var(--accent)";
                }
              }}
              onMouseDown={(e) => {
                if (!sending) {
                  e.currentTarget.style.transform = "scale(0.98)";
                }
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {sending ? "Sending..." : "Send Message →"}
            </button>
          </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<number | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const seededTheme = document.documentElement.dataset.theme;
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme =
      seededTheme === "dark" || seededTheme === "light"
        ? seededTheme
        : savedTheme === "dark" || savedTheme === "light"
          ? savedTheme
          : "dark";

    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            minHeight: 56,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>Don Wheeler</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {["Projects", "Skills"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {item}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "DM Sans, sans-serif",
                transition: "color 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              Contact
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <section style={{ padding: "80px 0 72px" }}>
          <div className="fade-up fade-up-1">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--accent-light)",
                border: "1px solid var(--accent-border)",
                borderRadius: 999,
                padding: "4px 12px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
                Open to new opportunities
              </span>
            </div>
          </div>

          <h1
            className="fade-up fade-up-2"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Frontend Developer for Business-Critical Interfaces.
            <br />
            <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
              Former MCSE systems engineer building modern web applications with an operations-first
              focus on reliability, clarity, and real-world usability.
            </span>
          </h1>

          <p
            className="fade-up fade-up-3"
            style={{
              fontSize: 17,
              color: "var(--text-secondary)",
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            I design and build frontend interfaces for dashboards, internal tools, and operational
            systems where accuracy, speed, and usability directly affect day-to-day work.
          </p>

          <div className="fade-up fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--accent-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "var(--accent)";
              }}
            >
              View Projects
            </a>
            <a
              href="https://github.com/DonWheelr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                padding: "10px 22px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid var(--border)",
                transition: "border-color 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-border)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              GitHub →
            </a>
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--border)", marginBottom: 72 }} />

        <section id="projects" style={{ marginBottom: 80 }}>
          <div className="fade-up fade-up-1" style={{ marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Selected Work
            </p>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Projects
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`fade-up fade-up-${i + 2}`}
              >
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "28px 32px",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-border)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 16,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h3
                        style={{
                          fontSize: 17,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          fontFamily: project.title.includes("_") ? "DM Mono, monospace" : "inherit",
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: "var(--green)",
                          background: "var(--success-bg)",
                          border: "1px solid var(--success-border)",
                          borderRadius: 999,
                          padding: "2px 8px",
                        }}
                      >
                        {project.highlight}
                      </span>
                    </div>
                    {"caseStudy" in project ? (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {project.live ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 13,
                              color: "var(--accent)",
                              fontWeight: 500,
                              textDecoration: "none",
                              border: "1px solid var(--accent-border)",
                              borderRadius: 6,
                              padding: "5px 12px",
                              background: "var(--accent-light)",
                            }}
                          >
                            Live Demo ↗
                          </a>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setExpandedCaseStudy(expandedCaseStudy === project.id ? null : project.id)}
                          style={{
                            fontSize: 13,
                            color: "var(--accent)",
                            fontWeight: 500,
                            border: "1px solid var(--accent-border)",
                            borderRadius: 6,
                            padding: "5px 12px",
                            background: expandedCaseStudy === project.id ? "var(--accent-light)" : "transparent",
                            cursor: "pointer",
                            fontFamily: "DM Sans, sans-serif",
                            transition: "background 0.15s, border-color 0.15s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "var(--accent-light)";
                            e.currentTarget.style.borderColor = "var(--accent)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = expandedCaseStudy === project.id ? "var(--accent-light)" : "transparent";
                            e.currentTarget.style.borderColor = "var(--accent-border)";
                          }}
                        >
                          {expandedCaseStudy === project.id ? "Hide Case Study" : "Case Study"}
                        </button>
                      </div>
                    ) : project.privateDemo ? (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {"videos" in project && project.videos ? (
                          <button
                            type="button"
                            onClick={() => setExpandedVideo(expandedVideo === project.id ? null : project.id)}
                            style={{
                              fontSize: 13,
                              color: "var(--accent)",
                              fontWeight: 500,
                              border: "1px solid var(--accent-border)",
                              borderRadius: 6,
                              padding: "5px 12px",
                              background: expandedVideo === project.id ? "var(--accent-light)" : "transparent",
                              cursor: "pointer",
                              fontFamily: "DM Sans, sans-serif",
                              transition: "background 0.15s, border-color 0.15s",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "var(--accent-light)";
                              e.currentTarget.style.borderColor = "var(--accent)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = expandedVideo === project.id ? "var(--accent-light)" : "transparent";
                              e.currentTarget.style.borderColor = "var(--accent-border)";
                            }}
                          >
                            {expandedVideo === project.id ? "Hide Video" : "Watch Video ▶"}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setModalOpen(true)}
                          style={{
                            fontSize: 13,
                            color: "var(--accent)",
                            fontWeight: 500,
                            border: "1px solid var(--accent-border)",
                            borderRadius: 6,
                            padding: "5px 12px",
                            background: "var(--accent-light)",
                            cursor: "pointer",
                            fontFamily: "DM Sans, sans-serif",
                          }}
                        >
                          {project.ctaLabel}
                        </button>
                      </div>
                    ) : (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13,
                          color: "var(--accent)",
                          fontWeight: 500,
                          textDecoration: "none",
                          border: "1px solid var(--accent-border)",
                          borderRadius: 6,
                          padding: "5px 12px",
                          background: "var(--accent-light)",
                        }}
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 16 }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          color: "var(--tag-text)",
                          background: "var(--tag-bg)",
                          borderRadius: 5,
                          padding: "3px 9px",
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {"videos" in project && project.videos && expandedVideo === project.id ? (
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.2s ease" }}>
                      {project.videos.map(({ src, label }) => (
                        <div key={src}>
                          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                            {label}
                          </p>
                          <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
                            {!loadedVideos.has(src) ? (
                              <div style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "var(--tag-bg)",
                                minHeight: 120,
                              }}>
                                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Loading…</span>
                              </div>
                            ) : null}
                            <video
                              src={src}
                              autoPlay
                              muted
                              loop
                              playsInline
                              onCanPlay={() => setLoadedVideos((prev) => new Set(prev).add(src))}
                              style={{
                                width: "100%",
                                display: "block",
                                opacity: loadedVideos.has(src) ? 1 : 0,
                                transition: "opacity 0.3s ease",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                {"caseStudy" in project && expandedCaseStudy === project.id ? (
                  <div
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderTop: "none",
                      borderRadius: "0 0 12px 12px",
                      padding: "28px 32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 24,
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                        The Challenge
                      </p>
                      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        {project.caseStudy?.challenge}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                        The Technical Win
                      </p>
                      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        {project.caseStudy?.technicalWin}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                        The Senior Moment
                      </p>
                      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        {project.caseStudy?.seniorMoment}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section id="skills" style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Capabilities
            </p>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Skills
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {skills.map((group) => (
              <div
                key={group.category}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "20px 22px",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 12,
                  }}
                >
                  {group.category}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "var(--border)",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "32px 36px",
            marginBottom: 80,
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Background
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Eighteen years managing IT infrastructure for banks and hospitals shaped how I think about code.
              </strong>{" "}
              When you've debugged permission cascades across 5,000 remote devices or traced a cascade failure through a hospital network, you learn that user experience isn't just about beauty—it's about <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>resilience.</strong>
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              That discipline carries into every React component and TypeScript type I write. I anticipate where apps break (browser permissions, stale state, edge cases), and I engineer solutions before users hit the error page. I understand network pipes, latency, hardware conflicts, and permission logic—the "boring infrastructure stuff" that actually keeps users engaged. To me, a production-ready application isn't impressive until it <em style={{ color: "var(--text-primary)" }}>fails gracefully.</em>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
            {[
              { label: "Years Experience", value: "20+ (Infrastructure)" },
              { label: "Industries", value: "Banking · Healthcare · SaaS" },
              { label: "Core Philosophy", value: "Reliable Before Clever" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" style={{ marginBottom: 80, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--accent)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Get In Touch
          </p>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              marginBottom: 12,
            }}
          >
            Let&apos;s build the future together.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28 }}>
            I can&apos;t wait to hear from you. I&apos;m currently open to full-time and contract
            roles.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "11px 26px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--accent-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "var(--accent)";
              }}
            >
              Send a Message
            </button>
            <a
              href="https://github.com/DonWheelr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                padding: "11px 26px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid var(--border)",
              }}
            >
              GitHub Profile
            </a>
          </div>
        </section>
      </div>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Don Wheeler
          </span>
          <span className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </footer>
    </main>
  );
}
