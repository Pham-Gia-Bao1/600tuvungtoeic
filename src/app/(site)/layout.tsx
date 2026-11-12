"use client";

import type { ReactNode } from "react";
import { MainLayout } from "@/components/layout/MainLayout/MainLayout";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
