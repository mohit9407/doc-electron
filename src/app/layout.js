import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/providers/theme-provider";
import "@uploadthing/react/styles.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Next app with electron",
  description: "Generated Next app with electron",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-primary-foreground min-h-screen">
            <div className="max-w-[769px] m-auto">
              <div className="w-full">{children}</div>
              <Toaster />
            </div>
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
