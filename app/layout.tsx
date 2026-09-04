import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

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
  title: 'KONSTANTA - hliníkové ploty s.r.o. | Brány, branky a pergoly na míru',
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
              background: '#ffffff',
              color: '#0a0a0a',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              padding: '10px 18px',
              boxShadow:
                '0 1px 2px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.12)',
            },
            /* Oranžová = brand akcent (--brand), stejně jako badge v patičce
               a why-us. Chyby zůstávají červené, aby si nesly svůj význam. */
            success: {
              iconTheme: {
                primary: 'var(--brand)',
                secondary: 'var(--brand-foreground)',
              },
            },
            loading: {
              iconTheme: {
                primary: 'var(--brand)',
                secondary: 'var(--brand-foreground)',
              },
            },
            error: {
              iconTheme: { primary: '#dc2626', secondary: '#ffffff' },
            },
            /* Prosté toast() nemá ikonu — dáme mu brand tečku s prstencem,
               aby i neutrální hlášky nesly oranžovou. */
            blank: {
              icon: (
                <span
                  aria-hidden
                  style={{
                    display: 'block',
                    width: '10px',
                    height: '10px',
                    flexShrink: 0,
                    borderRadius: '9999px',
                    background: 'var(--brand)',
                    boxShadow: '0 0 0 4px color-mix(in oklab, var(--brand) 18%, transparent)',
                  }}
                />
              ),
            },
          }}
        />
        <GoogleTagManager gtmId={process.env.GTM_ID!}/>
      </body>
    </html>
  )
}
