import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/modal/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt=""
            className="mb h-10 w-fit"
          />
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className=" justify-items-end text-dark-600 xl:text-left">
              HealtCare 2024 © All rights reserved
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/logo-main.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] w-full h-full"
      />
    </div>
  );
}
