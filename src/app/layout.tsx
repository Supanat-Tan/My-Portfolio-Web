//import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./Provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Portfolio Web App",
  description: "Portfolio Web App using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
