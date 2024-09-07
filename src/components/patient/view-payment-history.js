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

const ViewPaymentHistory = ({ staff }) => {
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
                      <FormLabel>Name</FormLabel>
                      <FormDescription>{staff.name}</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="age"
                  render={() => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormDescription>{staff.patientInfo.age}</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="mobileNumber"
                  render={() => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormDescription>{staff.mobileNumber}</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="amountCharges"
                  render={() => (
                    <FormItem>
                      <FormLabel>Amount Charges</FormLabel>
                      <FormDescription>{staff.amountCharges}</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="date"
                  render={() => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormDescription>
                        {staff.displayDate || staff.date }
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="treatment"
                  render={() => (
                    <FormItem>
                      <FormLabel>Treatment</FormLabel>
                      <FormDescription>{staff.treatment}</FormDescription>
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

export default ViewPaymentHistory;