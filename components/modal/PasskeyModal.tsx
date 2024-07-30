"use client";
import { use, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const path = usePathname(); // serve para pegar o pathname da página atual

  // pega a chave de acesso encriptada do localStorage
  const encriptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("acessKey")
      : "";

  useEffect(() => {
    const acessKey = encriptedKey && decryptKey(encriptedKey); // descriptografa a chave de acesso
    // se o pathname for igual a /?admin=true
    if (path) {
      if (acessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY?.toString()) {
        // verifica se a chave de acesso é igual a chave de acesso do .env.local
        setIsOpen(false);
        router.push("/admin"); // redireciona para a página de administração
      } else {
        setIsOpen(true);
      }
    }
  }, [encriptedKey]);

  const closeModal = () => {
    setIsOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // se a chave de acesso for igual a chave de acesso do .env.local então armazena a chave de acesso encriptada no localStorage
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey); // encripta a chave de acesso
      localStorage.setItem("accessKey", encryptedKey); // armazena a chave de acesso encriptada no localStorage
      setIsOpen(false);
    } else {
      setError("Passkey invalida !!,gere uma nova chave de acesso ou tente novamente"); 
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Verificar acesso do admin
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Para acessar a pagina de administração, por favor insira a senha de
            acesso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value: string) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            Entre com a senha do admin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
