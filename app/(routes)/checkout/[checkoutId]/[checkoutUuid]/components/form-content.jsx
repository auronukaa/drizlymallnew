"use client";

import { qytetet, qytetet2, qytetet3 } from "./qytetet";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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
    (acc, data) => acc + data.attributes.priceDiscount * data.quantity,
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
    <div className="w-full border border-gray-200 rounded-md py-6 px-6 mt-5 sm:mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                          className="w-full justify-between"
                          disabled={checkout.length === 0}
                        >
                          {value
                            ? shtetet.find((shteti) => shteti.value === value)
                                ?.label
                            : "Zgjedh shtetin"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === shteti.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
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
                          className="w-full justify-between"
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
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        qyteti.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
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
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        qyteti2.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
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
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        qyteti3.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
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

          <div className="w-full border border-gray-200 rounded-md mt-10">
            <div className="flex items-center px-6 py-8 justify-between">
              <p className="text-sm sm:text-3xl font-bold">
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

          <Button
            type="submit"
            disabled={checkout.length === 0}
            className="w-full mt-10 sm:w-[20%]"
          >
            Blej tani
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormContent;
