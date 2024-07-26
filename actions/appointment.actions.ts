'use server';

import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";


export const createAppointment = async (appointment: CreateAppointmentParams) => { 
  try{
    const newAppointment = await databases.createDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        ID.unique(),
        appointment
    )
    revalidatePath('/admin') // revalida a página de admin para atualizar a lista de pacientes
    return parseStringify(newAppointment)
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
}