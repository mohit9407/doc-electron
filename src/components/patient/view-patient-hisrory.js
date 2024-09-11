"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../../components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { dateFormat } from "../../lib/utils";

const ViewPatientHistory = ({ staff }) => {
  const form = useForm({});

  return (
    <>
      <Card className="mt-4">
        <CardContent className="p-4">
          <Form {...form}>
            <form>
              <div className="flex flex-col gap-[14px]">
                <FormField
                  name="name"
                  render={() => (
                    <FormItem>
                      <FormLabel>Chief Complaints</FormLabel>
                      <FormDescription>{staff.chiefComplaints}</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="age"
                  render={() => (
                    <FormItem>
                      <FormLabel>Allergic History</FormLabel>
                      <FormDescription>{staff.allergicHistory}</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="mobileNumber"
                  render={() => (
                    <FormItem>
                      <FormLabel>Past Treatment Received</FormLabel>
                      <FormDescription>
                        {staff.pastTreatmentReceived}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="amountCharges"
                  render={() => (
                    <FormItem>
                      <FormLabel>Examination Findings</FormLabel>
                      <FormDescription>
                        {staff.examinationFindings}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="treatment"
                  render={() => (
                    <FormItem>
                      <FormLabel>Investigation Advice</FormLabel>
                      <FormDescription>
                        {staff.investigationAdvice}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="date"
                  render={() => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormDescription>{dateFormat(staff.date)}</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewPatientHistory;
