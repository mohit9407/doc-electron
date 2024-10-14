// pages/reset-password.js
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPswdValidationSchema } from "../../lib/schema/staff/staff-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const resolver = yupResolver(resetPswdValidationSchema);
  const form = useForm({
    resolver,
  });

  const onSubmit = async (data) => {
    const { oldPassword, newPassword } = data;
    try {
      const {
        data: { status },
      } = await global.api.sendSync("getAndUpdateUserPswd", {
        oldPassword,
        newPassword,
      });

      if (status === 204) {
        toast({
          title: "Password updated successfully!",
        });
      } else {
        toast({
          title: "you are not authorized for change password!",
        });
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
            <h1>Reset Password</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[14px]">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="enter Old Password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="enter New Password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="reEnter New Password"
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
                  Reset
                </Button>
                <p className="text-center">
                  <Link href="/">Login?</Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;
