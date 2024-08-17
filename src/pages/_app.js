import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../providers/theme-provider";
import "./globals.css";

export default function App({ Component, pageProps }) {
  console.log("Component???", "APPP");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="bg-primary-foreground min-h-screen">
        <div className="max-w-[769px] m-auto">
          <div className="w-full">
            <Component {...pageProps} />
          </div>
          <Toaster />
        </div>
      </div>
    </ThemeProvider>
  );
}
