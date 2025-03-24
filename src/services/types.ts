type ServicePlansTypes = "DATA" | "OPEN" | "VOICE";

export type ThemeMode = "light" | "dark";

export enum ThemeModesEnum {
  LIGHT = "light",
  DARK = "dark",
}

export type Currency = "EUR" | "USD" | "GBP";

export const Currencies: Record<Currency, Currency> = {
  EUR: "EUR",
  USD: "USD",
  GBP: "GBP",
};

export enum PlanTypeEnum {
  DATA = "DATA",
  VOICE = "VOICE",
  OPEN = "OPEN",
}

export const PlanTypes: Record<PlanTypeEnum, ServicePlansTypes> = {
  DATA: "DATA",
  VOICE: "VOICE",
  OPEN: "OPEN",
};

export enum PackageTypeEnum {
  DATA = "DATA",
  VOICE = "VOICE",
  FREE_DATA = "FREE_DATA",
}

type PackageTypes = "Data" | "FreeData" | "Voice";

export const PackageTypes: Record<PackageTypeEnum, PackageTypes> = {
  DATA: "Data",
  VOICE: "Voice",
  FREE_DATA: "FreeData",
};

export enum ServiceTypeEnums {
  DATA = "DATA",
  VOICE = "VOICE",
}

export const ServiceTypes: Record<ServiceTypeEnums, "DATA" | "VOICE"> = {
  DATA: "DATA",
  VOICE: "VOICE",
};

export type AppRole =
  | "ROLE_ADMIN"
  | "ROLE_MANAGER"
  | "ROLE_USER"
  | "ROLE_PASSENGER"
  | "ROLE_SUPER_ADMIN";

export const Roles: Record<string, AppRole> = {
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_MANAGER: "ROLE_MANAGER",
  ROLE_USER: "ROLE_USER",
  ROLE_PASSENGER: "ROLE_PASSENGER",
  ROLE_SUPER_ADMIN: "ROLE_SUPER_ADMIN",
};

export const RoleLabels: Record<AppRole, string> = {
  ROLE_ADMIN: "Admin",
  ROLE_MANAGER: "Manager",
  ROLE_USER: "Remote Staff",
  ROLE_PASSENGER: "Guest",
  ROLE_SUPER_ADMIN: "Super Admin",
};

export type ValidRoles = keyof typeof Roles;

export const ADMIN_ROLE = "ADMIN";

export type ValidVoucherTypes = "PURCHASED" | "REDEEMED" | "FREE" | "PAYG";

type ConnectionStatusTypes =
  | "CONNECTED_FROM_THE_SAME_DEVICE"
  | "DISCONNECTED"
  | "CONNECTED_FROM_ANOTHER_DEVICE"
  | "DISCONNECTING"
  | "LIMIT_REACHED"
  | "RELOADING";

export const ConnectionStatus: Record<string, ConnectionStatusTypes> = {
  CONNECTED: "CONNECTED_FROM_THE_SAME_DEVICE",
  CONNECTED_OTHER_DEVICE: "CONNECTED_FROM_ANOTHER_DEVICE",
  DISCONNECTED: "DISCONNECTED",
  DISCONNECTING: "DISCONNECTING",
  LIMIT_REACHED: "LIMIT_REACHED",
  RELOADING: "RELOADING",
};

export const ROLES_ALLOWED_INTERNET_ACCESS = [
  Roles.ROLE_USER,
  Roles.ROLE_PASSENGER,
];

export enum AcquisitionTypeCode {
  Open = "OPEN",
  Voucher = "VOUCHER",
  PAYG = "PAYG",
}
