"use client";
import { v4 as uuidV4 } from "uuid";
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

import { patientSecFormValidationSchema } from "@/lib/schema/staff/staff-schema";

const AddPatientSecForm = ({
  setFormStep,
  setpatientinfo,
  isNewHistory = false,
  patientinfo,
  updatePatientHistory,
}) => {
  const router = useRouter();
  const resolver = yupResolver(patientSecFormValidationSchema);

  const form = useForm({
    resolver,
    defaultValues: patientinfo?.historyInfo
      ? {
          chiefComplaints: patientinfo?.historyInfo[0].chiefComplaints ?? "",
          allergicHistory: patientinfo?.historyInfo[0].allergicHistory ?? "",
          pastTreatmentReceived:
            patientinfo?.historyInfo[0].pastTreatmentReceived ?? "",
          examinationFindings:
            patientinfo?.historyInfo[0].examinationFindings ?? "",
          investigationAdvice:
            patientinfo?.historyInfo[0].investigationAdvice ?? "",
        }
      : {
          chiefComplaints: patientinfo?.chiefComplaints ?? "",
          allergicHistory: patientinfo?.allergicHistory ?? "",
          pastTreatmentReceived: patientinfo?.pastTreatmentReceived ?? "",
          examinationFindings: patientinfo?.examinationFindings ?? "",
          investigationAdvice: patientinfo?.investigationAdvice ?? "",
        },
  });

  async function onSubmit(data) {
    try {
      if (!patientinfo?.id && !isNewHistory) {
        setpatientinfo({
          ...patientinfo,
          historyInfo: [
            { id: uuidV4(), isDeleted: false, date: new Date(), ...data },
          ],
        });
        setFormStep(2);
        form.reset();
        router.refresh();
        toast({
          title: "History Added",
        });
      } else {
        let newHistoryReqObj = {};
        if (isNewHistory) {
          newHistoryReqObj = { id: uuidV4(), isDeleted: false };
        }
        updatePatientHistory(!isNewHistory ? patientinfo.id : null, {
          ...data,
          date: new Date(),
          ...newHistoryReqObj,
        });
      }
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {patientinfo?.id || isNewHistory ? "" : "Add Patient History"}
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
                {patientinfo?.id ? "Update" : "Add"} History
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddPatientSecForm;
