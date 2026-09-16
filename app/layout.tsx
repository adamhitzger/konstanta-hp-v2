import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { SITE_URL } from '@/lib/site'

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

const SITE_NAME = 'KONSTANTA - hliníkové ploty s.r.o.'
const DEFAULT_TITLE = 'KONSTANTA - hliníkové ploty s.r.o. | Brány, branky a pergoly na míru'
const DEFAULT_DESCRIPTION =
  'Vyrábíme a montujeme moderní hliníkové ploty, brány, branky a pergoly na míru po celé ČR. Odborné zaměření a kalkulace zdarma.'

/**
 * Výchozí metadata pro celý web. Stránky si přepisují `title`, `description`
 * a `alternates.canonical`; `openGraph`/`twitter` se z layoutu dědí, takže sdílený
 * odkaz na kteroukoli stránku dostane náhledový obrázek. Záměrně tu v nich není
 * `title`/`description`/`url` — Next je doplní z titulku a popisu konkrétní stránky,
 * kdežto hodnoty zapsané tady by se zdědily do všech podstránek a nabídka „O nás"
 * by se sdílela s titulkem homepage. Jazykové verze žijí na stejné URL s `?lang=`,
 * proto hreflang řeší jen sitemapa (viz `app/sitemap.ts`).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'hliníkové ploty',
    'hliníkové brány',
    'hliníkové branky',
    'bioklimatické pergoly',
    'ploty na míru',
    'posuvná brána',
    'oplocení',
    'KONSTANTA',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'construction',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    /* Telefony i e-mail jsou na webu jako explicitní odkazy — iOS nemá
       přepisovat ostatní čísla (IČO, DIČ, rozměry) na klikací telefony. */
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    alternateLocale: ['sk_SK', 'de_DE'],
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hliníková brána a plot KONSTANTA před moderním domem',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/og-image.jpg',
        alt: 'Hliníková brána a plot KONSTANTA před moderním domem',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo-konstanta.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    title: 'KONSTANTA',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
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
