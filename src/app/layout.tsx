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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
