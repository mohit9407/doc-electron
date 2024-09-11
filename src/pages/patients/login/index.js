import ClientOnly from "../../../components/client-only.js";
import AuthenticateView from "../../../components/patient/authenticate-view"

const Page = () => {
  return (
      <ClientOnly>
        <AuthenticateView />
      </ClientOnly>
  );
};

export default Page;
