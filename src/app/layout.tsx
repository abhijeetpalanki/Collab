import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collab",
  description: "Kanban styled collaboration tool",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-200 p-4">
          <a href="" className="logo">
            Collab
          </a>
        </header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
