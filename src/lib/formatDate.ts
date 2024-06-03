import { options } from "@/config/date";

export function formatDate(date: string | number): string {
  return new Date(date).toLocaleDateString("en-US", options);
}
