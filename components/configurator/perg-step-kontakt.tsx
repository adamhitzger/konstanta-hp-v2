"use client"

import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { kontaktStepContent, type Lang } from "@/lib/translations"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm font-medium text-destructive">{message}</p>
}

export function PergStepKontakt({ lang = "cs" }: { lang?: Lang }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PergolaConfType>()
  const t = kontaktStepContent[lang] ?? kontaktStepContent.cs

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title}</h2>
        <p className="mt-1 text-muted-foreground">{t.desc}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-fullname">{t.fullname}</Label>
          <Input id="perg-fullname" {...register("fullname")} placeholder={t.fullnamePlaceholder} required />
          <FieldError message={errors.fullname?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-email">{t.email}</Label>
          <Input id="perg-email" type="email" {...register("email")} placeholder={t.emailPlaceholder} required />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-phoneNumber">{t.phone}</Label>
          <Input id="perg-phoneNumber" type="tel" {...register("phoneNumber")} placeholder={t.phonePlaceholder} required />
          <FieldError message={errors.phoneNumber?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-company">{t.company}</Label>
          <Input id="perg-company" {...register("company")} placeholder={t.companyPlaceholder} />
          <FieldError message={errors.company?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-obec">{t.obec}</Label>
          <Input id="perg-obec" {...register("obec")} placeholder={t.obecPlaceholder} required />
          <FieldError message={errors.obec?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-address">{t.address}</Label>
          <Input id="perg-address" {...register("address")} placeholder={t.addressPlaceholder} required />
          <FieldError message={errors.address?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-zip">{t.zip}</Label>
          <Input id="perg-zip" {...register("zip")} placeholder={t.zipPlaceholder} required />
          <FieldError message={errors.zip?.message} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="perg-file">{t.file}</Label>
          <Input id="perg-file" multiple type="file" accept="image/jpeg,image/png" {...register("file")} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="perg-message">{t.message}</Label>
          <Textarea id="perg-message" {...register("message")} placeholder={t.messagePlaceholder} rows={4} />
          <FieldError message={errors.message?.message} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {t.consent}
      </p>
    </div>
  )
}
