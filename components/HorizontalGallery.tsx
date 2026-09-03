'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryContent, heroContent, withLang, type Lang } from '@/lib/translations';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Slide = {
  title: string; // velký nápis přes fotku (zároveň odkaz do galerie realizací)
  label: string; // alt text
  href: string; // kam nadpis vede — záložka kategorie v /realizace
  imgMobile: string; // fotka na výšku (mobil)
  imgDesktop: string; // fotka na šířku (desktop – méně oříznutá)
  person: string; // průhledný cutout rodiny/páru
};

// Obrázky vychází z produktových řad (viz components/products.tsx); texty z lib/translations.ts.
const slideImages = [
  { imgMobile: '/real/mobil/oploceni.png', imgDesktop: '/real/oploceni.jpeg', person: '/gallery-fam-1.png' },
  { imgMobile: '/real/mobil/brana-sikma.jpg', imgDesktop: '/real/brana-sikma.jpg', person: '/gallery-fam-2.png' },
  { imgMobile: '/real/Branka.jpg', imgDesktop: '/real/Branka.jpg', person: '/gallery-fam-3.png' },
  { imgMobile: '/real/mobil/pergola.jpg', imgDesktop: '/real/Pergola.jpg', person: '/gallery-fam-4.png' },
];

/* Pořadí sedí se `slideImages` i s `galleryContent.titles`: plot, brána, branka, pergola.
   Nadpis je klikatelný schválně — kdo ví, co hledá, nemusí odscrollovat celou lištu. */
const slideHrefs = [
  '/realizace?filter=ploty',
  '/realizace?filter=brany',
  '/realizace?filter=branky',
  '/realizace?filter=pergoly',
];

// O kolik px se prvek maximálně posune při parallaxu (speed × BASE).
const PARALLAX_BASE = 80;

export default function HorizontalGallery({ lang = "cs" }: { lang?: Lang }) {
  const t = galleryContent[lang] ?? galleryContent.cs
  const hero = heroContent[lang] ?? heroContent.cs
  const slides: Slide[] = slideImages.map((img, i) => ({
    ...img,
    title: t.titles[i],
    label: t.labels[i],
    href: withLang(slideHrefs[i], lang),
  }))
  const heroHighlights = hero.highlights
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = root.current!.querySelector('.wrapper') as HTMLElement;
      const track = root.current!.querySelector('.track') as HTMLElement;

      // Kolik px musí track ujet, aby ukázal poslední snímek.
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      // ---- Horizontální scroll: posouváme JEDNU lištu, ne panely zvlášť ----
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => '+=' + getScrollAmount(),
        pin: true,
        scrub: 1,
        animation: tween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (slides.length - 1),
          duration: 0.2,
          ease: 'power1.inOut',
        },
      });

      // ---- Mouse-track parallax ----
      const targets = gsap.utils
        .toArray<HTMLElement>('[data-parallax]')
        .map((el) => ({
          speed: parseFloat(el.dataset.parallax || '0'),
          xTo: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }),
          yTo: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' }),
        }));

      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 5; // -1..1
        const ny = (e.clientY / window.innerHeight - 0.5) * 5; // -1..1
        targets.forEach(({ speed, xTo, yTo }) => {
          xTo(nx * speed * PARALLAX_BASE);
          yTo(ny * speed * PARALLAX_BASE);
        });
      };

      window.addEventListener('mousemove', onMove);

      // Lenis (SmoothScroll) se inicializuje v parent useEffectu, tzn. PO
      // tomto hooku. Přeměříme pin/track až po připojení, aby seděly rozměry.
      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      window.addEventListener('load', refresh);

      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('load', refresh);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {/*
        -mt-20 vytáhne sekci pod sticky header (h-20), takže se pin chytne
        hned na začátku a stránka nepodjede o výšku headeru.
      */}
      <div className="wrapper relative -mt-20 h-screen w-full overflow-hidden bg-foreground">
        {/* Horizontální lišta – šířka = počet snímků × 100vw */}
        <div className="track flex h-full will-change-transform">
          {slides.map((s) => (
            <section
              key={s.title}
              className="slide relative flex h-full w-screen shrink-0 items-center justify-center overflow-hidden"
            >
              {/* Pozadí – na mobilu na výšku, na desktopu na šířku.
                  110 % / přesah 5 % = rezerva pro mouse-parallax bez odhalení krajů. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax="0.2"
                src={s.imgMobile}
                alt={s.label}
                className="absolute -inset-[5%] h-[110%] w-[110%] max-w-none object-cover md:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax="0.2"
                src={s.imgDesktop}
                alt={s.label}
                className="absolute -inset-[5%] hidden h-[110%] w-[110%] max-w-none object-cover md:block"
              />
              {/* gradient pro čitelnost textu (tmavý nahoře i dole) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,20,22,0.55) 0%, rgba(20,20,22,0.12) 30%, rgba(20,20,22,0.28) 60%, rgba(20,20,22,0.75) 100%)',
                }}
              />

              {/* Velký název řady – zůstává za postavou (jako „popisek scény").
                  Je to odkaz do galerie realizací dané kategorie: postava i gradient mají
                  `pointer-events-none`, takže se klik dostane až sem i přes z-[2]. */}
              <h2
                className="relative z-1 select-none text-center font-heading font-extrabold uppercase leading-none text-white"
                style={{
                  marginTop: '-14vh',
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  letterSpacing: '0.02em',
                  textShadow: '0 12px 30px rgba(0,0,0,0.45)',
                }}
              >
                <Link
                  href={s.href}
                  aria-label={`${s.label} – ${t.slideCta}`}
                  title={t.slideCta}
                  className="group/title inline-flex items-start gap-[0.08em] decoration-[0.06em] transition-colors duration-300 hover:text-brand  focus-visible:text-brand focus-visible:outline-none motion-reduce:transition-none"
                >
                  {s.title}
                  <ArrowUpRight
                    aria-hidden
                    className="mt-[0.12em] h-[0.34em] w-[0.34em] shrink-0 text-brand transition-transform duration-300 group-hover/title:translate-x-1 group-focus-visible/title:translate-x-1 motion-reduce:transition-none"
                    strokeWidth={2.5}
                  />
                </Link>
              </h2>

              {/* Rodina „ve scéně" – vlastní pro každé pozadí, nohy dole 
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-center">
                eslint-disable-next-line @next/next/no-img-element 
                <img
                  src={s.person}
                  alt=""
                  className="h-[60vh] w-auto max-w-none select-none object-contain object-bottom drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] sm:h-[62vh]"
                />
              </div>*/}
            </section>
          ))}
        </div>

        {/* ---- Horní metadata pruh z <Hero /> – pod headerem, konstantní (od md) ---- */}
        <div
          className="pointer-events-none absolute inset-x-0 z-20 hidden px-4 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:px-6 md:block lg:px-8"
          style={{ top: 'calc(5rem + 0.85rem)' }}
        >
          <div className="mx-auto flex max-w-7xl items-center">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              {hero.metaLeft}
            </span>
          </div>
        </div>

        {/* ---- Kicker nad názvem (pod headerem) – konstantní přes všechny slidy ---- */}
        <span
          className="pointer-events-none absolute inset-x-0 z-20 select-none text-center font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-white/85 sm:text-xs"
          style={{ top: 'calc(5rem + 3rem)' }}
        >
          {t.kicker}
        </span>

        {/* ---- Text z <Hero /> – vlevo dole, konstantní (od lg) ---- */}
        <div className="pointer-events-none absolute bottom-[9vh] left-8 z-20 hidden max-w-md flex-col gap-5 [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] lg:flex xl:left-12">
          <div className="h-[2px] w-14 bg-white/60" />
          <p className="text-lg font-medium leading-relaxed text-white">
            {hero.subtitle}
          </p>
          <ul className="flex flex-col gap-2.5">
            {heroHighlights.map((h) => (
              <li key={h} className="flex items-center gap-3">
                <span className="h-[1.5px] w-6 shrink-0 bg-brand" />
                <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-white/90">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- CTA dole – konstantní přes všechny slidy ---- */}
        <div
          className="md:hidden absolute inset-x-0 z-20 flex justify-center px-6"
          style={{ bottom: '6vh' }}
        >
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-white bg-white px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
