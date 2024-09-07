"use client";
import ClientOnly from "../../../components/client-only";
import AuthenticateView from "../../../components/patient/authenticate-view.js";

const Page = () => {
  return (
    <>
      <ClientOnly>
        <AuthenticateView />
      </ClientOnly>
    </>
  );
};

export default Page;
