"use client"

import { useEffect, useState, type RefObject } from "react"

/** Rychlost automatického posunu (px/s). */
const SPEED = 36
/** Po ručním zásahu (kolečko, tah, dotyk) se pás na chvíli zastaví, aby neujížděl pod rukou. */
const RESUME_AFTER_MS = 2500
/** Tah myší kratší než tohle bereme jako klik na kartu/logo, ne jako posun pásu. */
const DRAG_THRESHOLD_PX = 6
/** Nejméně kopií pásu; skutečný počet se dopočítá podle šířky (viz níž). */
const MIN_COPIES = 3

/**
 * Na serveru se vykreslí jedna kopie, další přidá až efekt po připojení.
 * Kopie jsou jen vizuální výplň smyčky, ale v HTML nesou plnou váhu — u pásu
 * recenzí to byly dvě třetiny všech obrázků a Tailwind tříd na stránce.
 */
const SSR_COPIES = 1

/**
 * Samojedoucí vodorovný pás, který si návštěvník kdykoli posune sám.
 *
 * Kontejner je obyčejný `overflow-x-auto`, takže kolečko, prst i posuvník
 * fungují nativně; hook k tomu přidává:
 *  - auto-posun přes rAF (stojí při najetí myší, po ručním zásahu na chvíli
 *    a pro `prefers-reduced-motion` úplně),
 *  - tah myší (na dotyku posouvá prohlížeč sám) — klik po tahu odkaz neotevře,
 *  - nekonečnou smyčku: obsah je v DOMu `copies`× a scrollLeft držíme uvnitř druhé
 *    kopie; přejede-li přes její okraj (auto-posunem i rukou), skočí o šířku jedné
 *    kopie zpět/vpřed. Kopie jsou identické, takže skok není vidět.
 *
 * Volající vykreslí obsah `copies`× za sebou (další kopie s `aria-hidden` a odkazy
 * s `tabIndex=-1`, ať čtečka a tabulátor projdou položky jednou — ne `inert`,
 * vidět bývá právě prostřední kopie a musí zůstat klikací), první kopii dá `firstCopyRef`.
 * Posuvník kontejneru schovat (`no-scrollbar`) — při přeskoku smyčky by poskakoval.
 */
export function useAutoScrollLoop(
  scrollerRef: RefObject<HTMLElement | null>,
  firstCopyRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [copies, setCopies] = useState(SSR_COPIES)

  /* Kolik kopií je potřeba: za druhou kopií musí zbývat aspoň celý viewport,
     jinak pás narazí na konec dřív, než dojde na práh přeskoku. */
  useEffect(() => {
    const el = scrollerRef.current
    const first = firstCopyRef.current
    if (!el || !first || !enabled) return
    const measure = () => {
      const w = first.offsetWidth
      if (w > 0) setCopies(Math.max(MIN_COPIES, Math.ceil(el.clientWidth / w) + 2))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(first)
    return () => ro.disconnect()
  }, [scrollerRef, firstCopyRef, enabled])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || !enabled) return

    const copyWidth = () => el.scrollWidth / copies
    const wrap = () => {
      const w = copyWidth()
      if (w <= 0) return
      if (el.scrollLeft < w) el.scrollLeft += w
      else if (el.scrollLeft >= 2 * w) el.scrollLeft -= w
    }
    el.scrollLeft = copyWidth()

    let pausedUntil = 0
    let hovering = false
    let dragging = false
    const pause = () => {
      pausedUntil = performance.now() + RESUME_AFTER_MS
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    /* scrollLeft si vedeme v `pos` jako desetinné číslo — při 36 px/s je to
       necelý pixel na snímek a Safari by zaokrouhlené přírůstky zahodilo. */
    let pos = el.scrollLeft
    let last = 0
    let raf = 0
    const tick = (now: number) => {
      if (last && !reduced && !hovering && !dragging && now >= pausedUntil && !document.hidden) {
        /* Když pás mezitím posunul uživatel, navážeme z jeho pozice. */
        if (Math.abs(el.scrollLeft - pos) > 1) pos = el.scrollLeft
        pos += (SPEED * Math.min(now - last, 100)) / 1000
        el.scrollLeft = pos
      }
      wrap()
      last = now
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    let startX = 0
    let startScroll = 0
    let moved = false
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return
      dragging = true
      moved = false
      startX = e.clientX
      startScroll = el.scrollLeft
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) > DRAG_THRESHOLD_PX) {
        moved = true
        /* Capture až po skutečném tahu: kdyby se zapnula hned v pointerdown, cílem
           kliknutí by byl pás místo odkazu a karty/loga by nešly prokliknout. */
        el.setPointerCapture(e.pointerId)
      }
      if (moved) el.scrollLeft = startScroll - dx
    }
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      pause()
    }
    /* Po tahu nesmí puštění myši nad odkazem otevřít jeho cíl. */
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    const onEnter = () => {
      hovering = true
    }
    const onLeave = () => {
      hovering = false
    }

    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerup", onPointerUp)
    el.addEventListener("pointercancel", onPointerUp)
    el.addEventListener("click", onClick, true)
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    el.addEventListener("wheel", pause, { passive: true })
    el.addEventListener("touchstart", pause, { passive: true })
    el.addEventListener("touchmove", pause, { passive: true })
    el.addEventListener("focusin", pause)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerup", onPointerUp)
      el.removeEventListener("pointercancel", onPointerUp)
      el.removeEventListener("click", onClick, true)
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("wheel", pause)
      el.removeEventListener("touchstart", pause)
      el.removeEventListener("touchmove", pause)
      el.removeEventListener("focusin", pause)
    }
  }, [scrollerRef, enabled, copies])

  return copies
}
