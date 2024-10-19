"use client";
import { v4 as uuidV4 } from "uuid";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/use-toast";

import { patientThirdFormValidationSchema } from "../../lib/schema/staff/staff-schema";
import { Input } from "../ui/input";

const AddPatientThirdForm = ({
  setFormStep,
  setpatientinfo,
  patientinfo,
  isNewPayment = false,
  updatePaymentHistory,
  setInvoiceNo,
  invoiceNo,
}) => {
  const [isSubmited, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("completed");

  const router = useRouter();
  const resolver = yupResolver(patientThirdFormValidationSchema);
  const form = useForm({
    resolver,
    defaultValues: {
      treatment: patientinfo?.treatment ?? "",
      amountCharges: patientinfo?.amountCharges ?? "",
    },
  });

  const sendDataToApi = async () => {
    try {
      const { data: addedUser } = await global.api.sendSync(
        "addPatient",
        patientinfo
      );
      if (addedUser.status === 201) {
        setIsSubmitted(false);
        setpatientinfo(null);
        setFormStep(3);
        toast({
          title: "Patient Added",
        });
        setTimeout(() => {
          router.push("/patients/manage");
        }, 700);
      }
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data) {
    try {
      const commonKeyval = { id: uuidV4(), isDeleted: false, date: new Date() };
      if (!patientinfo?.id && !isNewPayment) {
        const newInvoice = invoiceNo + 1;
        setpatientinfo({
          ...patientinfo,
          isDeleted: false,
          paymentInfo: [
            {
              ...data,
              ...commonKeyval,
              invoiceNo: newInvoice,
              payment: selectedOption,
            },
          ],
        });
        setIsSubmitted(true);
        setInvoiceNo(newInvoice);
      } else {
        let newPaymentReqObj = {};
        if (isNewPayment) {
          newPaymentReqObj = commonKeyval;
        }
        updatePaymentHistory(!isNewPayment ? patientinfo.id : null, {
          ...data,
          date: new Date(),
          payment: selectedOption,
          ...newPaymentReqObj,
        });
      }
    } catch (error) {
      toast({
        title: error.response ? error.response.data.message : error.message,
        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    if (isSubmited && patientinfo?.paymentInfo?.length > 0) {
      sendDataToApi();
    }
  }, [patientinfo, isSubmited]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  

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
                        type="number"
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

              <div className="mt-[10px] mb-[10px] flex gap-[10px]">
                <h2 className="font-semibold">Payment:</h2>
                <FormField
                  control={form.control}
                  name="payment"
                  value={selectedOption}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <>
                            <label className="mr-[2px]">
                              <input
                                name="payment-field"
                                type="radio"
                                value="pending"
                                id="yes-radio"
                                checked={selectedOption === "pending"}
                                onChange={handleOptionChange}
                              />
                              {' '}Pending
                            </label>
                            <label className="ml-[10px]">
                              <input
                                name="payment-field"
                                type="radio"
                                value="completed"
                                id="no-radio"
                                checked={selectedOption === "completed"}
                                onChange={handleOptionChange}
                              />
                              {' '}Completed
                            </label>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

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