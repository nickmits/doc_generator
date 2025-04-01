import { Dispatch, SetStateAction, type SyntheticEvent } from "react";

export interface CreateSingleUserFormProps {
  handleClose: (event?: SyntheticEvent, reason?: string) => void;
  onCreatingUser: Dispatch<SetStateAction<boolean>>;
}

export type UsersWithErrors = {
  id: number;
};

export interface ErrorUploading {
  heading: string;
  body: string;
}

export type InitialCsvObject = {
  [key: string]: string;
};

export type RoleLabels = "Remote Staff" | "Guest" | "Manager" | "Admin";
