"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined; // arquivos que serão enviados para o servidor
  onChange: (files: File[]) => void; // função que será chamada quando um arquivo for selecionado
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  // o useCallback é usado para evitar que a função seja recriada a cada renderização 
  // essa função será chamada quando um arquivo for selecionado e será responsável por chamar a função onChange passada por parâmetro
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop }); // hook do react-dropzone que retorna as props necessárias para o dropzone funcionar

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};