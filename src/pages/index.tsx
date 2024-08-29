import ClientOnly from "../components/client-only.js";
// import Footer from "../components/dashboard/footer";
// import HeroCard from "../components/dashboard/hero-card";
import AppBar from "../components/navbar/app-bar";
// import { ThemeProvider } from "../providers/theme-provider";
// import { Toaster } from "../components/ui/toaster";

const Page = () => {
  return (
    <>
      <ClientOnly>
        <AppBar />
        {/* <HeroCard /> */}
      </ClientOnly>
      {/* <Footer /> */}
    </>
  );
};

export default Page;
