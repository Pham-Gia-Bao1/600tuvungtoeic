import type { Metadata } from "next";
import { AppProviders } from "./providers";
import "@/styles/tailwind.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "TOEIC Mastery",
  description: "Learn vocabulary and prepare for the TOEIC exam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
