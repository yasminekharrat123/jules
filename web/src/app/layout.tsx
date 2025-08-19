import Header from "@/components/ui/header"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Header />
        {children}
      </body>
    </html>
  )
}
