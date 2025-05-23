import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Table from "@/src/components/table";
import TablePlaceholder from "@/src/components/table-placeholder";
import ExpandingArrow from "@/src/components/expanding-arrow";
import * as React from "react";
import { RegistrationForm } from "../components/RegistrationForm";
import { z } from "zod";
import { chicagoSchema, schema } from "@/src/components/registrationSchema";
import prisma from "@/lib/prisma";
import { ChicagoRegistrationForm } from "@/src/components/ChicagoRegistrationForm";

export const dynamic = "force-dynamic";

export type formState = {
  message: string;
  user?: z.infer<typeof schema>;
  issues?: string[];
};

export default function Home() {
  const onDataAction = async (data: z.infer<typeof schema>) => {
    // use server indique à Next.js qu'il s'agit d'une fonction serveur uniquement
    "use server";
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      return { message: "User registered", user: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  const onFormAction = async (prevState: formState, formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      const createdUser = await prisma.users.create({
        data: {
          name: parsed.data.fullName,
          email: parsed.data.email,
          pseudonyme: parsed.data.pseudonyme,
          image:
            "https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg",
        },
      });
      return {
        message: "User registered",
        user: {
          fullName: createdUser.name,
          email: createdUser.email,
          pseudonyme: createdUser.pseudonyme,
        },
      };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  const onChicagoFormAction = async (formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = chicagoSchema.safeParse(data);

    if (parsed.success) {
      const createdChicago = await prisma.chicago.create({
        data: {
          name: parsed.data.name,
        },
      });
      return {
        message: "User registered",
        user: { name: createdChicago.name },
      };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="https://vercel.com/templates/next.js/postgres-prisma"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>Deploy your own to Vercel</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Postgres on Vercel
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
      <RegistrationForm
        onDataAction={onDataAction}
        onFormAction={onFormAction}
      />
      <ChicagoRegistrationForm onFormAction={onChicagoFormAction} />
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        <Link
          href="https://vercel.com/postgres"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Vercel Postgres
        </Link>{" "}
        demo with{" "}
        <Link
          href="https://prisma.io"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Prisma
        </Link>{" "}
        as the ORM. <br /> Built with{" "}
        <Link
          href="https://nextjs.org/docs"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Next.js App Router
        </Link>
        .
      </p>

      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
        <Link
          href="https://postgres-starter.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Starter
        </Link>
        <Link
          href="https://postgres-kysely.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Kysely
        </Link>
        <Link
          href="https://postgres-drizzle.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Drizzle
        </Link>
      </div>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
