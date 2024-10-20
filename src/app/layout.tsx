import "./globals.css";
import { Inter } from "next/font/google";
import MainLayout from "@layout/MainLayout";
import { ConfigProvider } from "antd";
import { MenuStyles } from "@layout/Menu";

export const metadata = {
  metadataBase: new URL("https://postgres-prisma.vercel.app"),
  title: "Vercel Postgres Demo with Prisma",
  description:
    "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ConfigProvider
          theme={{
            components: {
              Menu: MenuStyles,
            },
          }}
        >
          <MainLayout children={children} />
        </ConfigProvider>
      </body>
    </html>
  );
}
