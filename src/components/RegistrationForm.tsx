// inside of src/app/RegistrationForm.tsx
"use client"

import { useForm } from "react-hook-form"

import { useFormState } from "react-dom"
import { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./registrationSchema"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formState } from "../app/page"

interface Props {
  onDataAction: (data: z.infer<typeof schema>) => Promise<{
    message: string
    user?: z.infer<typeof schema>
    issues?: string[]
  }>
  onFormAction: (prevState: formState, data: FormData) => Promise<formState>
}

export const RegistrationForm = ({ onDataAction, onFormAction }: Props) => {
  // useFormState prend une action et un état initial en paramètre
  // useFormState rend un state et une "action client" prête à l'emploi par <form>
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  })

  // z.infer permet de typer les default values avec le type inféré du "schema"
  const form = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    // Connexion du schema de registrationSchema avec
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Envoi de la réponse formulaire via api POST format json
    // fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    // Envoi de la réponse formulaire via api POST format form
    // const formData = new FormData(); // Create a new FormData object
    // formData.append("fullName", data.fullName)
    // formData.append("email", data.email)
    // fetch("/api/registerForm", {
    //     method: "POST",
    //     body: formData
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    // Utilisation de l'action serveur avec les données "brutes"
    // console.log(await onDataAction(data));
    // Utilisation de l'action serveur avec les données au format form
    // Version sans prevState
    // const formData = new FormData(); // Create a new FormData object
    // formData.append("fullName", data.fullName);
    // formData.append("email", data.email);
    // formData.append("pseudonyme", data.pseudonyme);
    // console.log(await onFormAction(formData));
  }

  return (
    // ...form donne tous les contrôles de useForm à notre <Form >
    <Form {...form}>
      <div>{state?.message}</div>
      {/* Passage par l'action/ref => permet de se passer de javascript et d'avoir côté client la validation serveur */}
      <form
        ref={formRef}
        action={formAction}
        // onSubmit={form.handleSubmit(onSubmit)}
        // Utilisation du submit du <form> HTML
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom Nom</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Votre nom & prénom ici.</FormDescription>
              <FormMessage /> *
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage /> *
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pseudonyme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudonyme</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your pseudonyme.</FormDescription>
              <FormMessage /> *
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
