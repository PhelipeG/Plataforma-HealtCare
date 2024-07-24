'use client';
import { Doctors } from "@/constants";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { SelectItem } from "../ui/select";
import { Appointment } from "@/types/appwrite.types";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAppointmentSchema } from "@/lib/validation";
import SubmitButton from "./SubmitButton";
import "react-datepicker/dist/react-datepicker.css";
export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const AppointmentFormValidation = getAppointmentSchema(type); // aqui estamos pegando o schema de validação do tipo de formulário que estamos utilizando
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
  });

  async function onSubmitNewAppointment() {
    setIsLoading(true);
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancelar Consulta";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Registrar Consulta";
  }

  return (
    <Form {...form}>
      <form action={onSubmitNewAppointment} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Nova consulta</h1>
            <p className="text-dark-700">
             Solicite sua consulta
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Medicos disponiveis"
              placeholder="Selecione o medico"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Data esperada"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Motivo da consulta"
                placeholder="Check up mensal"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comentarios/Notas/Observacoes"
                placeholder="Suas preferencias"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
