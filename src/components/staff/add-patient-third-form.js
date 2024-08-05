"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { patientThirdFormValidationSchema } from "@/lib/schema/staff/staff-schema";
import { Input } from "../ui/input";

const AddPatientThirdForm = ({ setFormStep }) => {
  const router = useRouter();
  const resolver = yupResolver(patientThirdFormValidationSchema);
  const form = useForm({
    resolver,
    defaultValues: {
      date: new Date(),
    },
  });

  async function onSubmit(data) {
    try {
      form.reset();
      form.setValue("treatment", "");

      setFormStep(3);
      toast({
        title: "History Added",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,

        variant: "destructive",
      });
    }
  }

  return (
    <>
      {"Payment History"}
      <Card className="mt-4">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="treatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treatment</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Treatment"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Treatment</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Change</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        disabled={form.formState.isSubmitting}
                        placeholder="Amount Change"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Amount Change</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full my-2"
                type="submit"
              >
                Add History
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddPatientThirdForm;
