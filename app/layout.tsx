import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow-condensed',
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Konstanta HP | Hliníkové ploty, brány, branky a pergoly na míru',
  description:
    'Vyrábíme a montujeme moderní hliníkové ploty, brány, branky a pergoly na míru po celé ČR. Odborné zaměření a kalkulace zdarma.',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/logo-konstanta.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="cs"
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--foreground)',
              color: 'var(--background)',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              padding: '10px 18px',
            },
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
