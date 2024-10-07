"use client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../../components/ui/card";
import DynamicLink from "../../components/dynamic-link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ilegibleLoginData } from "../../lib/constants/patient";
import { useState } from "react";
import { toast } from "../ui/use-toast";

const AuthenticateView = () => {
  const hiddenLink = useRef(null);
  const form = useForm({});
  const [checkAuthorized, setCheckAuthorized] = useState(false);

  const onSubmit = async (data) => {
    try {
        if (
          data.email === ilegibleLoginData.email &&
          data.password === ilegibleLoginData.password
        ) {
            hiddenLink.current?.click();
        } else {
          toast({
            title: "you are not authorized for login !",
          });
          setCheckAuthorized(true);
        }
    } catch (error) {
      // Handle login error
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="max-w-[400px] m-auto pt-[1%] w-full">
        <Card className="mt-4">
          <CardContent className="p-4">
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
                            placeholder="Email"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Email</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Password</FormDescription> 
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full my-2"
                  type="submit"
                >
                  Authenticate
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <DynamicLink href={"/patients/dashboard"} style={{display: "none"}}>
            <Button
              ref={hiddenLink}
              size="icon"
            >
              Redirect on dashboard
            </Button>
          </DynamicLink>
      </div>
      {checkAuthorized && (
        <div className="max-w-[400px] m-auto pt-[1%] w-full">
          you are not authorized for login !
        </div>
      )}
    </>
  );
};

export default AuthenticateView;