import ClientOnly from "../../../components/client-only.js";
import HeroCard from "../../../components/dashboard/hero-card";
import AppBar from "../../../components/navbar/app-bar";

const Page = () => {
  return (
      <ClientOnly>
        <AppBar />
        <HeroCard />
      </ClientOnly>
  );
};

export default Page;
