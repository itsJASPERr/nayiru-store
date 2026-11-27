import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "@/config/navigation";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localeDetection: false,
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
