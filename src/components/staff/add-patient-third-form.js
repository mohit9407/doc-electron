"use client";
import { useForm } from "react-hook-form";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
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

const AddPatientThirdForm = ({ setFormStep, setpatientinfo, patientinfo }) => {
  const [isSubmited, setIsSubmitted] = useState(false)
  const router = useRouter();
  const resolver = yupResolver(patientThirdFormValidationSchema);
  const form = useForm({
    resolver,
    defaultValues: {
      treatment:  patientinfo?.treatment ?? "",
      amountChange:  patientinfo?.amountChange ?? "",
    },
  });

  const sendDataToApi = async () => {
    try {
      const addedUser = await axios.post("/api/patients", patientinfo);
      if (addedUser.status === 201) {
        setIsSubmitted(false)
        setFormStep(3);
        setpatientinfo(null)
        router.refresh();
        toast({
          title: "Patient Added",
        });
      }
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,

        variant: "destructive",
      });
    }
  }

  async function onSubmit(data) {
    try {
      setpatientinfo({patientinfo, ...data});
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,

        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    if (isSubmited && patientinfo?.amountCharges) {
      sendDataToApi();
    }
  },[patientinfo, isSubmited]);

  return (
    <>
      {"Payment"}
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
                name="amountCharges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Charges</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        disabled={form.formState.isSubmitting}
                        placeholder="Amount Charges"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Amount Charges</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full my-2"
                type="submit"
              >
                Complete payment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddPatientThirdForm;
