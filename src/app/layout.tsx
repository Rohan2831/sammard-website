import Navbars from "@/components/layout/navbar/navbar";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbars/>
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}