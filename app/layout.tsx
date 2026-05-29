import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "./ChatWidget"; // 1. Додаємо імпорт нашого чату

export const metadata: Metadata = {
  title: "БудПроф — Будівельна компанія",
  description: "Будівництво приватних котеджів під ключ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className="antialiased">
        {children}
        
        {/* 2. Додаємо чат глобально на всі сторінки сайту */}
        <ChatWidget />
      </body>
    </html>
  );
}