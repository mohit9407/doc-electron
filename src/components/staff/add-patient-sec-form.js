"use client";
import axios from "axios";
import { readFileSync, writeFile } from "fs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
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

import { patientSecFormValidationSchema } from "@/lib/schema/staff/staff-schema";

const AddPatientSecForm = ({ setFormStep, setpatientinfo, patientinfo }) => {
  const router = useRouter();
  const resolver = yupResolver(patientSecFormValidationSchema);
  const form = useForm({
    resolver,
    defaultValues: {
      chiefComplaints: patientinfo?.chiefComplaints ?? "",
      allergicHistory: patientinfo?.allergicHistory ?? "",
      pastTreatmentReceived: patientinfo?.pastTreatmentReceived ?? "",
      examinationFindings: patientinfo?.examinationFindings ?? "",
      investigationAdvice: patientinfo?.investigationAdvice ?? "",
    },
  });

  async function onSubmit(data) {
    try {
      setpatientinfo({...patientinfo, ...data});
      form.reset();
      // form.setValue("chiefComplaints", "");
      // form.setValue("allergicHistory", "");
      // form.setValue("pastTreatmentReceived", "");
      setFormStep(2);
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
      {"Add Patient History"}
      <Card className="mt-4">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="chiefComplaints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chief Complaints</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Chief Complaints of patient"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Chief Complaints of patient
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergicHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergic History</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Allergic History of patient"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Allergic History of patient
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pastTreatmentReceived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Treatment Received</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Past Treatment Received"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Past Treatment Received</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examinationFindings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Examination Findings</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Examination Findings"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Examination Findings</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investigationAdvice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investigation Advice</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Investigation Advice"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Investigation Advice</FormDescription>
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

export default AddPatientSecForm;
