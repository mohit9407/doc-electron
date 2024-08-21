"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../../components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const ViewPaymentHistory = ({ staff }) => {
  const form = useForm({});

  return (
    <>
      <Card className="mt-4">
        <CardContent className="p-4">
          <Form {...form}>
            <form>
              <FormField
                name="name"
                render={() => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Textarea
                      className="resize-none"
                      type="text"
                      readOnly
                      value={staff.name}
                    />
                    <FormDescription>Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="amountCharges"
                render={() => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <Input
                      type="number"
                      readOnly
                      value={staff.patientInfo.age}
                    />
                    <FormDescription>Age</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="mobileNumber"
                render={() => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <Textarea
                      className="resize-none"
                      type="text"
                      readOnly
                      value={staff.mobileNumber}
                    />
                    <FormDescription>Mobile Number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="amountCharges"
                render={() => (
                  <FormItem>
                    <FormLabel>Amount Charges</FormLabel>
                    <Input type="number" readOnly value={staff.amountCharges} />
                    <FormDescription>Amount Charges</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="date"
                render={() => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Input readOnly value={staff.date} />
                    <FormDescription> Date</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="treatment"
                render={() => (
                  <FormItem>
                    <FormLabel>Treatment</FormLabel>
                    <Textarea
                      className="resize-none"
                      type="text"
                      readOnly
                      value={staff.treatment}
                    />
                    <FormDescription>Treatment</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ViewPaymentHistory;
