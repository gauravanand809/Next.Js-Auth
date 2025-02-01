// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });
const metadata = {
  title:"Business Analytics"  
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>
          {metadata.title}
        </title>
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
