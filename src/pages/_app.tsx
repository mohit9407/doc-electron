import type { AppProps } from "next/app";
import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../providers/theme-provider";
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="bg-primary-foreground min-h-screen">
        <div className="max-w-[1034px] m-auto">
          <div className="w-full">
            <Component {...pageProps} />
          </div>
          <Toaster />
        </div>
      </div>
    </ThemeProvider>
  );
}
