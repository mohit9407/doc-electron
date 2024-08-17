"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
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
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/use-toast";
import { Calendar } from "../../components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { staffValidationSchema } from "../../lib/schema/staff/staff-schema";
import { maritalStatus, sexType } from "../../lib/constants/patient";
import { cn } from "../../lib/utils";

const AddStaffForm = ({
  setFormStep,
  setpatientinfo,
  patientinfo,
  updatePatientGeneralInfo,
}) => {
  const [formSelectVal, setFormSelectVal] = useState({
    maritalStatus: "",
    gender: "",
  });

  const router = useRouter();
  const resolver = yupResolver(staffValidationSchema);
  const form = useForm({
    resolver,
    defaultValues: {
      date: patientinfo?.date ?? new Date(),
      gender: patientinfo?.gender ?? "",
      maritalStatus: patientinfo?.maritalStatus ?? "",
    },
    values: patientinfo,
  });
  useEffect(() => {
    if (patientinfo) {
      setFormSelectVal({
        maritalStatus: patientinfo.maritalStatus,
        gender: patientinfo.gender,
      });
    }
  }, [patientinfo]);

  const onChangeHandler = (field, value) => {
    setFormSelectVal((prevValue) => ({ ...prevValue, [field]: value }));
  };

  async function onSubmit(data) {
    try {
      if (!patientinfo?.id) {
        setpatientinfo({ ...patientinfo, ...data });
        setFormStep(1);
        form.reset();
        router.refresh();
      } else {
        updatePatientGeneralInfo(data);
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
      {patientinfo?.id ? "Edit Patient" : "Add Patient"}
      <Card className="mt-4">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            disabled
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          disabled={form.formState.isSubmitting}
                          className="w-full"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Patient visited Date</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={form.formState.isSubmitting}
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Name of the Patient</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile No.</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={form.formState.isSubmitting}
                        placeholder="Mobile No."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Patient Mobile Number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        disabled={form.formState.isSubmitting}
                        placeholder="Age.."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Age of patient</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        onChangeHandler("gender", value);
                        field.onChange(value);
                      }}
                      value={formSelectVal["gender"] || field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sexType.map((_genderType) => (
                          <SelectItem value={_genderType} key={_genderType}>
                            {_genderType.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Patient Sex(Male, Female)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        disabled={form.formState.isSubmitting}
                        placeholder="Weight.."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Weight of patient</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onChangeHandler("maritalStatus", value);
                      }}
                      value={formSelectVal["maritalStatus"] || field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            value="Select Marital Status"
                            placeholder="Select Marital Status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatus.map((_statusType) => (
                          <SelectItem value={_statusType} key={_statusType}>
                            {_statusType.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Patient Marital Status(Single, Married)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="menstrualHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menstrual History</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Menstrual history of patient"
                        type="text"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Menstrual history of patient
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full my-2"
                type="submit"
              >
                {patientinfo?.id ? "Edit Patient" : "Add Patient"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddStaffForm;
