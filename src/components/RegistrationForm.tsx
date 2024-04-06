// inside of src/app/RegistrationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./registrationSchema";
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
  onDataAction: (data: z.infer<typeof schema>) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
  onFormAction: (data: FormData) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}

export const RegistrationForm = ({ onDataAction, onFormAction }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
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
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    console.log(await onFormAction(formData));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
