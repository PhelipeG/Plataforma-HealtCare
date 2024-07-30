import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getAppointment } from "@/actions/appointment.actions";
import { Doctors } from "@/constants";

export default async function Success({
  searchParams,
  params: { userId },
}: SearchParamProps) {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  // const doctor = Doctors.find(
  //   (doctor) => doctor.name === appointment.primaryPhysician ? doctor : ''
  // );
  
  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            priority
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Seu <span className="text-green-500">agendamento</span> foi enviado
            com sucesso!
          </h2>
          <p>Entraremos em contato em breve para confirmar. </p>
        </section>

        <section className="request-details">
          <p>Detalhes da consulta solicitada: </p>
          <div className="flex items-center gap-3">
            {/* <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p> */}
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            {/* <p> {formatDateTime(appointment.schedule).dateTime}</p> */}
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
}
