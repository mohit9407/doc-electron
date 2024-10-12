import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";

const ForgotPassword = () => {
  const form = useForm({});

  const onSubmit = async (data) => {
    await global.api.sendSync("sendPswdOnMail", {
      mail: data.mail,
    });
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
                            placeholder="enter your Email"
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
      </div>
    </>
  );
};

export default ForgotPassword;
