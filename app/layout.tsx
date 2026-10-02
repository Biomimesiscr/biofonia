import type { Metadata } from "next";
import { MotionDefaults } from "@/components/motion/motion-defaults";
import { ToastProvider } from "@/components/shared/toast";
import { site } from "@/content/home";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <MotionDefaults />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
