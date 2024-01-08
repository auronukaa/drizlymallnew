"use client";

import { qytetet, qytetet2, qytetet3 } from "./qytetet";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

// import { CaretSort, CheckIcon } from "@radix-ui/react-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCheckout from "@/hooks/use-checkout";
import sendForms from "@/actions/api";
import { useRouter } from "next/navigation";
import HiddenForm from "@/components/hidden-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Currency from "./currency";
import { FaHandHoldingUsd } from "react-icons/fa";

const shtetet = [
  {
    label: "Kosovë",
    value: "kosovë",
  },
  {
    label: "Shqipëri",
    value: "shqipëri",
  },
  {
    label: "Maqedoni",
    value: "maqedoni",
  },
];

const FormContent = () => {
  const [shteti, setShteti] = useState();

  const phoneRegexInfo = () => {
    if (shteti === "shqipëri") {
      return "10";
    } else if (shteti === "maqedoni") {
      return "9";
    } else {
      return "9";
    }
  };

  // const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  const validationSchema = Yup.object({
    emri: Yup.string()
      .max(20, "Emri duhet të ketë 20 ose më pak karaktere")
      .min(
        3,
        "Emri duhet të jetë i saktë dhe duhet të ketë 3 ose më shumë karaktere"
      )
      .required("Emri juaj është i domosdoshëm."),
    mbiemri: Yup.string()
      .max(20, "Mbiemri duhet të ketë 20 ose më pak karaktere")
      .min(
        3,
        "Mbiemri duhet të jetë i saktë dhe duhet të ketë 3 ose më shumë karaktere"
      )
      .required("Mbiemri juaj është i domosdoshëm."),
    shteti: Yup.string().required("Shteti duhet të zgjedhet"),
    number: Yup.string()
      .min(phoneRegexInfo(), "Numri duhet të ketë të pakten 9-10 karaktere")
      .required("Numri duhet të zgjidhet"),
    adresa: Yup.string()
      .max(30, "Adresa duhet të ketë 30 ose më pak karaktere")
      .min(
        3,
        "Adresa duhet të jetë i saktë dhe duhet të ketë 3 ose më shumë karaktere"
      )
      .required("Adresa është e domosdoshme."),
    qyteti: Yup.string().required("Qyteti duhet të zgjedhet"),
    quantity: Yup.array().of(Yup.string()),
    type: Yup.array().of(Yup.string()),
    title: Yup.array().of(Yup.string()),
  });
  const checkout = useCheckout((state) => state.checkout);
  const checkoutSet = useCheckout();

  const total = checkout.reduce(
    (acc, data) =>
      data?.attributes?.priceDiscount
        ? acc + data?.attributes?.priceDiscount * data.quantity
        : acc + data?.attributes?.price * data.quantity,
    0
  );

  const form = useForm({
    defaultValues: {
      quantity: checkout.map((item) => item.quantity),
      type: checkout.map((item) => item.type),
      title: checkout.map((item) => item.attributes.title),
    },
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();
  const uuid = uuidv4();

  const checkShtet = (values) => {
    if (values === "Kosovë") {
      return "KS";
    } else if (values === "Shqipëri") {
      return "SQ";
    } else if (values === "Maqedoni") {
      return "MQ";
    }
  };

  const onSubmit = async (values) => {
    await sendForms(values);
    router.push(
      `/faleminderit/${uuid}${checkShtet(values.shteti)}`,
      undefined,
      {
        scroll: true,
      }
    );
    checkoutSet.removeCheckout();
  };

  const {
    register,
    formState: { errors },
    formState,
    reset,
  } = form;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [open2, setOpen2] = React.useState(false);

  return (
    <div className="w-full px-6 py-6 mt-5 border border-gray-200 rounded-md sm:mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {checkout.map((item) => (
              <HiddenForm
                key={item.id}
                data={item}
                register={register}
                form={form}
              />
            ))}

            <FormField
              control={form.control}
              name="emri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emri*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      {...register("emri")}
                      disabled={checkout.length === 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mbiemri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mbiemri*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      {...register("mbiemri")}
                      disabled={checkout.length === 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="shteti"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Shteti*</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between w-full"
                          disabled={checkout.length === 0}
                        >
                          {value
                            ? shtetet.find((shteti) => shteti.value === value)
                                ?.label
                            : "Zgjedh shtetin"}
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Zgjedh shtetin"
                            className="h-9"
                          />
                          <CommandEmpty>Nuk u gjet asnjë shtet</CommandEmpty>
                          <CommandGroup>
                            {shtetet.map((shteti) => (
                              <CommandItem
                                key={shteti.value}
                                onSelect={(currentValue) => {
                                  form.setValue("shteti", shteti.label);
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                  setShteti(currentValue);
                                }}
                              >
                                {shteti.label}
                                <svg
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === shteti.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="qyteti"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Qyteti*</FormLabel>

                    <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open2}
                          disabled={!shteti || checkout.length === 0}
                          className="justify-between w-full"
                        >
                          {field.value && shteti === "kosovë"
                            ? qytetet.find(
                                (qytetet) => qytetet.name === field.value
                              )?.name
                            : field.value && shteti === "shqipëri"
                            ? qytetet2.find(
                                (qytetet2) => qytetet2.name === field.value
                              )?.name
                            : field.value && shteti === "maqedoni"
                            ? qytetet3.find(
                                (qytetet3) => qytetet3.name === field.value
                              )?.name
                            : "Zgjedh qytetin"}
                          <svg
                            className="w-4 h-4 ml-2 opacity-50 shrink-0"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                              fill="currentColor"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] h-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Zgjedh qytetin"
                            className="h-9"
                          />
                          <CommandEmpty>Nuk u gjet asnjë qytet</CommandEmpty>
                          <CommandGroup>
                            {shteti === "kosovë"
                              ? qytetet.map((qyteti) => (
                                  <CommandItem
                                    value={qyteti.name}
                                    key={qyteti.name}
                                    onSelect={() => {
                                      form.setValue("qyteti", qyteti.name);
                                      setOpen2(false);
                                    }}
                                  >
                                    {qyteti.name}
                                    <svg
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        qyteti.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </CommandItem>
                                ))
                              : shteti === "shqipëri"
                              ? qytetet2.map((qyteti2) => (
                                  <CommandItem
                                    value={qyteti2.name}
                                    key={qyteti2.name}
                                    onSelect={() => {
                                      form.setValue("qyteti", qyteti2.name);
                                      setOpen2(false);
                                    }}
                                  >
                                    {qyteti2.name}
                                    <svg
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        qyteti2.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </CommandItem>
                                ))
                              : shteti === "maqedoni" &&
                                qytetet3.map((qyteti3) => (
                                  <CommandItem
                                    value={qyteti3.name}
                                    key={qyteti3.name}
                                    onSelect={() => {
                                      form.setValue("qyteti", qyteti3.name);
                                      setOpen2(false);
                                    }}
                                  >
                                    {qyteti3.name}
                                    <svg
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        qyteti3.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                      width="15"
                                      height="15"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </CommandItem>
                                ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numri i telefonit*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      {...register("number")}
                      disabled={!shteti || checkout.length === 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresa*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      {...register("adresa")}
                      disabled={!shteti || checkout.length === 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full mt-10 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between px-6 py-8">
              <p className="text-sm font-medium sm:text-3xl">
                Totali i porosisë +{" "}
                <span className="block sm:inline">Transporti:</span>
              </p>
              <Currency
                value={
                  shteti === "kosovë"
                    ? total + 1.5
                    : shteti === "shqipëri"
                    ? total + 3.5
                    : shteti === "maqedoni"
                    ? total + 3.5
                    : total
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center mt-8">
            <div className="flex items-center justify-center w-full mb-5 gap-x-2 sm:w-fit">
              <div className="flex items-center justify-center p-1.5 bg-orange-600 rounded-full">
                <FaHandHoldingUsd size={16} color="#000" />
              </div>
              <p>Pagesa kryhet me para në dorë</p>
            </div>
            <Button
              type="submit"
              disabled={checkout.length === 0}
              className="w-full sm:w-[20%]"
            >
              Blej tani
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormContent;
