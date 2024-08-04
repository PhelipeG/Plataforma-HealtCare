import { Appointment } from "@/types/appwrite.types";
import { useState } from "react";
import { Button } from "../ui/button";
import { AppointmentForm } from "./AppointmentForm";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
;

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500" || "text-red-500"}`}
        >
          {type === "schedule" ? "Agendar" : "Cancelar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Agendamento da consulta</DialogTitle>
          <DialogDescription>
          Por favor, preencha os seguintes detalhes para agendar a consulta.
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};