import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeFirstLetter = (text: unknown): string => {
  if (typeof text !== "string") return "";
  return (text + "").replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

export const formatDateToLocal = (dateStr: string, locale: string = "id-ID"): string => {
  const date: Date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  };
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const getNowforDB = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const i = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${i}:${s}`;
};

export type paginationGenerated = Array<number | string>;

export const generatePagination = (currentPage: number, totalPages: number): paginationGenerated => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
