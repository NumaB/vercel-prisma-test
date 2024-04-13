// inside of src/app/RegistrationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chicagoSchema } from "./registrationSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  onFormAction: (data: FormData) => Promise<{
    message: string;
    chicago?: z.infer<typeof chicagoSchema>;
    issues?: string[];
  }>;
}

export const ChicagoRegistrationForm = ({ onFormAction }: Props) => {
  const form = useForm<z.infer<typeof chicagoSchema>>({
    mode: "onChange",
    resolver: zodResolver(chicagoSchema),
    defaultValues: {
      name: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof chicagoSchema>) => {
    // fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log(data))

    // const formData = new FormData(); // Create a new FormData object
    // formData.append("fullName", data.fullName)
    // formData.append("email", data.email)

    // fetch("/api/registerForm", {
    //     method: "POST",
    //     body: formData
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log(data))

    // console.log(await onDataAction(data));

    const formData = new FormData(); // Create a new FormData object
    formData.append("name", data.name);
    console.log(await onFormAction(formData));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
