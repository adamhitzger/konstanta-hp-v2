"use client"

import type React from "react"
import { useActionState, useEffect, useRef, useState } from "react"
import { Phone, Mail, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal, AnimatedText } from "@/components/reveal"
import { ActionResponse, Contact as ContactType } from "@/types"
import toast from 'react-hot-toast';
import { sendGenerateLead, sendUserDataToGTM } from "@/lib/gtm"
import { sendContact } from "@/lib/actions"
import { contactContent, type Lang } from "@/lib/translations"

const contactPhones = [
  { phone: { value: "+420 770 169 411", href: "tel:+420770169411" }, email: { value: "info@konstantahp.cz", href: "mailto:info@konstantahp.cz" } },
  { phone: { value: "+420 722 015 842", href: "tel:+420722015842" }, email: { value: "nabidky@konstantahp.cz", href: "mailto:nabidky@konstantahp.cz" } },
  { phone: { value: "+420 728 711 590", href: "tel:+420728711590" }, email: null },
]

const actionState: ActionResponse<ContactType> = {
    success: false,
    message: ""
}

export function Contact({ lang = "cs" }: { lang?: Lang }) {
  const t = contactContent[lang] ?? contactContent.cs
  const contactGroups = t.groups.map((g, i) => ({ title: g.title, ...contactPhones[i] }))

  const [state, action, isPending] = useActionState(sendContact, actionState)
  /* `sendContact` vrací u neúspěchu `errors` i `inputs`. Bez nich zákazník viděl jen
     obecný toast, nevěděl, které pole je špatně, a nativní odeslání mu formulář
     navíc vyprázdnilo — musel psát všechno znovu. */
  const fieldError = (field: keyof ContactType) => state.errors?.[field]?.[0]
  const prev = state.inputs

  /* Formulář se odesílá nativně přes `action`, takže po úspěchu už hodnoty polí nikde
     nejsou — `user_data` pro rozšířené konverze se proto odchytí při odeslání. */
  const submitted = useRef<{ name: string; email: string; tel: string } | null>(null)
    
    useEffect(() => {
        if (!state.success && state.message) {
            toast.error(state.message);
        }else if(state.success && state.message){
            toast.success(state.message);
            if (submitted.current) {
              sendUserDataToGTM({
                email: submitted.current.email,
                phone: submitted.current.tel,
                fullName: submitted.current.name,
                city: "",
                zip: "",
                state: lang,
              })
            }
            /* Obecný kontakt se neváže na konkrétní produkt, `inquired_product`
               se proto nepošle vůbec — dřív tu natvrdo sedělo „oplocení“ a kazilo
               to statistiku poptávaných produktů. */
            sendGenerateLead("kontakt")
          }
    }, [state.success, state.message, lang]);

  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col gap-8 bg-foreground p-8 text-background lg:p-12">
            <Reveal variant="left" childSelector="[data-c]" stagger={0.15}>
              <div data-c>
                <AnimatedText
                  as="h2"
                  text={t.heading}
                  className="font-heading text-3xl font-extrabold tracking-tight text-balance"
                />
                <p className="mt-4 text-lg leading-relaxed text-background/70 text-pretty transition-[letter-spacing] duration-500 hover:tracking-wide">
                  {t.paragraph}
                </p>
              </div>

              <ul data-c className="mt-8 flex flex-col gap-6">
                {contactGroups.map((g) => (
                  <li key={g.title} className="border-t border-background/15 pt-5 first:border-t-0 first:pt-0">
                    <p className="mb-2 text-base font-semibold text-accent">{g.title}</p>
                    <div className="flex flex-col gap-1.5">
                      <a href={g.phone.href} className="flex items-center gap-3 font-heading text-lg font-bold hover:text-accent">
                        <Phone className="h-4 w-4 shrink-0 text-accent" />
                        {g.phone.value}
                      </a>
                      {g.email && (
                        <a href={g.email.href} className="flex items-center gap-3 text-background/80 hover:text-accent">
                          <Mail className="h-4 w-4 shrink-0 text-accent" />
                          {g.email.value}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div data-c className="mt-8 rounded-2xl bg-background/5 p-5 text-sm text-background/70">
                <p className="mb-2 font-semibold text-background">{t.fakturacniUdaje}</p>
                <p>KONSTANTA - hliníkové ploty s.r.o.</p>
                <p>IČO: 21827150 &nbsp;·&nbsp; DIČ: CZ21827150</p>
                <p>{t.sidlo} Maleč 36, 582 76, Česká republika</p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 p-8 lg:p-12">
            {state.success ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h3 className="font-heading text-2xl font-bold">{t.successTitle}</h3>
                <p className="text-muted-foreground">{t.successText}</p>
              </div>
            ) : (
              <form
                action={action}
                onSubmit={(e) => {
                  const fd = new FormData(e.currentTarget)
                  submitted.current = {
                    name: String(fd.get("name") ?? ""),
                    email: String(fd.get("email") ?? ""),
                    tel: String(fd.get("tel") ?? ""),
                  }
                }}
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="lang" value={lang} />
                <Reveal variant="right" childSelector="[data-f]" stagger={0.1} className="flex flex-col gap-5">
                  <div data-f className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">{t.labels.name}</Label>
                      <Input id="name" name="name" required minLength={3} defaultValue={prev?.name} placeholder={t.placeholders.name} />
                      {fieldError("name") ? <p className="text-sm text-destructive">{fieldError("name")}</p> : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone">{t.labels.phone}</Label>
                      <PhoneInput id="phone" name="tel" required defaultValue={prev?.tel} placeholder={t.placeholders.phone} />
                      {fieldError("tel") ? <p className="text-sm text-destructive">{fieldError("tel")}</p> : null}
                    </div>
                  </div>
                   <div data-f className="grid gap-5 sm:grid-cols-2">
                  <div data-f className="flex flex-col gap-2">
                    <Label htmlFor="email">{t.labels.email}</Label>
                    <Input id="email" name="email" type="email" required defaultValue={prev?.email} placeholder={t.placeholders.email} />
                    {fieldError("email") ? <p className="text-sm text-destructive">{fieldError("email")}</p> : null}
                  </div>
                  <div data-f className="flex flex-col gap-2">
                    <Label htmlFor="company">{t.labels.company}</Label>
                    {/* Nepovinné: `contactSchema.company` je `optional()`. S `required`
                        se soukromá osoba bez firmy nedostala přes nativní validaci
                        a formulář jí vůbec nešlo odeslat. `type="company"` navíc
                        není platný typ inputu. */}
                    <Input id="company" name="company" defaultValue={prev?.company} placeholder={t.placeholders.company} />
                  </div>
                  </div>
                  <div data-f className="flex flex-col gap-2">
                    <Label htmlFor="message">{t.labels.message}</Label>
                    {/* `maxLength` musí sedět s `contactSchema.msg` — bez něj zákazník
                        napsal delší zprávu a server ji odmítl až po odeslání. */}
                    <Textarea
                      id="message"
                      rows={4}
                      name="msg"
                      maxLength={2000}
                      defaultValue={prev?.msg}
                      placeholder={t.placeholders.message}
                    />
                    {fieldError("msg") ? <p className="text-sm text-destructive">{fieldError("msg")}</p> : null}
                  </div>
                  <Button data-f type="submit" size="lg" className="font-semibold transition-transform hover:scale-[1.02]">
                    {!isPending ? <>{t.submit}</> : <Loader2 className="animate-spin"/>}
                  </Button>
                  <p data-f className="text-xs text-muted-foreground">
                    {t.consent}
                  </p>
                </Reveal>
              </form>
            )}

            <Reveal variant="up" className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title={t.mapTitle}
                src="https://www.google.com/maps?cid=10837241253732648833&hl=cs&gl=CZ&output=embed"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale-[20%]"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
