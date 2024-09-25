import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "E.T. 25 DE MAYO S.A.C.",
  description: "Aplicación de gestión de minivans para empresa de transporte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
