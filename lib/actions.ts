"use server"
import { ActionResponse, Contact } from "@/types";
import nodemailer from "nodemailer"
import { contactSchema } from "./schemas";
import { revalidatePath } from "next/cache";

function smtp(){
  return nodemailer.createTransport({
        host: "smtp.seznam.cz",
        port: 587,
        secure: false,
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        },
        tls: {
         ciphers: "SSLv3"
        } 
      });
}

export async function sendContact(
    prevState: ActionResponse<Contact>,
    formData: FormData
  ): Promise<ActionResponse<Contact>> {
    let revalidate = false;
    const transporter = smtp();
    try {
      const contact: Contact = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        tel: formData.get("tel") as string,
        company: formData.get("company") as string,
        msg: formData.get("msg") as string,
      };
  
      const validatedData = contactSchema.safeParse(contact);
      if (!validatedData.success) {
        return {
          success: false,
          message: "Některá pole jste nevyplnili dobře",
          errors: validatedData.error.flatten().fieldErrors,
          inputs: contact,
        };
      } else {
        const data = validatedData.data;
        const sendMail = await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          //to: "nabidky@konstantahp.cz",
          to: "adam.hitzger@icloud.com",
          subject: "Nový kontakt",
          text: `Celé jméno: ${data.name}, Email: ${data.email}, Tel. číslo: ${data.tel}, Firma: ${data.company}, Zpráva: ${data.msg}`,
        });
        
        if (!sendMail.accepted) {
          revalidate = false;
          return {
            success: false,
            message: "Nepodařilo se odeslat e-mail. Zkuste to znovu",
          };
        } else {
             
          revalidate = true;
          return {
            success: true,
            message: "Děkujeme za záslání! Co nevidět se Vám ozveme.",
          };
        }
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Nepovedlo se odeslat Vaše údaje",
      };
    } finally {
      if (revalidate) {
        revalidatePath("/");
      }
    }
}