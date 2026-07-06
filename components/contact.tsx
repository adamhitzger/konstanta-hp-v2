"use client"

import type React from "react"
import { useActionState, useEffect, useState } from "react"
import { Phone, Mail, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal, AnimatedText } from "@/components/reveal"
import { ActionResponse, Contact as ContactType } from "@/types"
import toast from 'react-hot-toast';
import { sendGTMEvent } from "@next/third-parties/google";
import { sendContact } from "@/lib/actions"
const contactGroups = [
  {
    title: "Zaměření a obchod",
    phone: { value: "+420 770 169 411", href: "tel:+420770169411" },
    email: { value: "info@konstantahp.cz", href: "mailto:info@konstantahp.cz" },
  },
  {
    title: "Fakturace, kalkulace, nabídky",
    phone: { value: "+420 722 015 842", href: "tel:+420722015842" },
    email: { value: "nabidky@konstantahp.cz", href: "mailto:nabidky@konstantahp.cz" },
  },
  {
    title: "Výroba a technické řešení",
    phone: { value: "+420 728 711 590", href: "tel:+420728711590" },
    email: null,
  },
]

const actionState: ActionResponse<ContactType> = {
    success: false,
    message: ""
}

export function Contact() {
  

  const [state, action, isPending] = useActionState(sendContact, actionState)
    
    useEffect(() => {
        if (!state.success && state.message) {
            toast.error(state.message);
        }else if(state.success && state.message){
            toast.success(state.message);
            sendGTMEvent({
              event: 'generate_lead',
              form_type: 'kontakt',       // nebo "kontakt" / "poptávka"
              inquired_product: 'oplocení',  // nebo "oplocení"
            })
          }
    }, [state.success, state.message]);

  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col gap-8 bg-foreground p-8 text-background lg:p-12">
            <Reveal variant="left" childSelector="[data-c]" stagger={0.15}>
              <div data-c>
                <AnimatedText
                  as="h2"
                  text="Pojďme naplánovat váš nový plot"
                  className="font-heading text-3xl font-extrabold tracking-tight text-balance"
                />
                <p className="mt-4 text-lg leading-relaxed text-background/70 text-pretty transition-[letter-spacing] duration-500 hover:tracking-wide">
                  Vyplňte formulář a my se vám ozveme s nezávaznou kalkulací zdarma. Zaměření i návrh řešení je u nás samozřejmostí.
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
                <p className="mb-2 font-semibold text-background">Fakturační údaje</p>
                <p>KONSTANTA - hliníkové ploty s.r.o.</p>
                <p>IČO: 21827150 &nbsp;·&nbsp; DIČ: CZ21827150</p>
                <p>Sídlo: Maleč 36, 582 76, Česká republika</p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 p-8 lg:p-12">
            {state.success ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h3 className="font-heading text-2xl font-bold">Děkujeme!</h3>
                <p className="text-muted-foreground">Vaši poptávku jsme přijali. Brzy se vám ozveme.</p>
              </div>
            ) : (
              <form action={action} className="flex flex-col gap-5">
                <Reveal variant="right" childSelector="[data-f]" stagger={0.1} className="flex flex-col gap-5">
                  <div data-f className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Jméno a příjmení</Label>
                      <Input id="name" name="name" required placeholder="Jan Novák" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" name="tel" type="tel" required placeholder="+420 000 000 000" />
                    </div>
                  </div>
                   <div data-f className="grid gap-5 sm:grid-cols-2">
                  <div data-f className="flex flex-col gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" name="email" type="email" required placeholder="jan@email.cz" />
                  </div>
                  <div data-f className="flex flex-col gap-2">
                    <Label htmlFor="company">Firma</Label>
                    <Input id="company" name="company" type="company" required placeholder="Konstanta HP s.r.o" />
                  </div>
                  </div>
                  <div data-f className="flex flex-col gap-2">
                    <Label htmlFor="message">Co potřebujete?</Label>
                    <Textarea id="message" rows={4} name="msg" placeholder="Mám zájem o plot a posuvnou bránu..." />
                  </div>
                  <Button data-f type="submit" size="lg" className="font-semibold transition-transform hover:scale-[1.02]">
                    {!isPending ? <>Odeslat poptávku</> : <Loader2 className="animate-spin"/>}
                  </Button>
                  <p data-f className="text-xs text-muted-foreground">
                    Odesláním souhlasíte se zpracováním osobních údajů za účelem vyřízení poptávky.
                  </p>
                </Reveal>
              </form>
            )}

            <Reveal variant="up" className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Mapa - KONSTANTA hliníkové ploty, Maleč 36"
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
