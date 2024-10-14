import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import DynamicLink from "@/components/dynamic-link";

const ForgotPassword = () => {
  const loginLink = useRef(null);
  const form = useForm({});

  const onSubmit = async (data) => {
    loginLink.current?.click();
    const { data: respData } = await global.api.sendSync("sendPswdOnMail", {
      mail: data.email,
    });
    if (respData.status === 200) {
      toast({
        title: "Password is successfully send on mail!",
      });
    } else {
      toast({
        title: "There is an issue while sending password on mail",
      });
    }
  };

  return (
    <>
      <div className="max-w-[400px] m-auto pt-[1%] w-full">
        <Card className="mt-4">
          <CardContent className="p-4">
            <h1>Forgot Password</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[14px]">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your Email"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full my-2" type="submit">
                  Send Password on Mail
                </Button>
                <div className="flex justify-between">
                  <p className="text-center">
                    <Link href="/reset-password">Reset Password?</Link>
                  </p>
                  <p className="text-center">
                    <Link href="/">Login?</Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <DynamicLink href={"/"} style={{ display: "none" }}>
          <Button ref={loginLink} size="icon">
            Redirect on login
          </Button>
        </DynamicLink>
      </div>
    </>
  );
};

export default ForgotPassword;
