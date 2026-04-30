import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don Wheeler — Full-Stack Engineer",
  description:
    "Portfolio of Don Wheeler, Full-Stack Software Engineer and Infrastructure Specialist with 20 years of experience in banking and healthcare.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme;
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
