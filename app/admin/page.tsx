import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { getRecentAppointmentList } from "@/actions/appointment.actions";

const AdminDashboard = async  () => {

  const appointments = await getRecentAppointmentList();
  console.log(appointments);


  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1>Seja bem vindo(a) 😊</h1>
          <p className="text-dark-700">
            Gerencie suas consultas, pacientes e muito mais no painel.
          </p>
        </section>

        <section className="admin-stat">
         <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Consultas agendadas"
            icon={"/assets/icons/appointments.svg"}
          /> 
         <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Consultas pendentes"
            icon={"/assets/icons/pending.svg"}
          /> 
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount ? appointments.cancelledCount : 0}
            label="Consultas canceladas"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>


      </main>
    </div>
  );
};

export default AdminDashboard;
