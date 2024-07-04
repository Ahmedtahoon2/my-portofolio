import { siteConfig } from "@/config/site";

/**
 * Formats a date into a localized string representation using options defined in the site configuration.
 *
 * @param {string | number} date - The date to format, either as a string or a number representing milliseconds since the Unix epoch.
 * @returns {string} A formatted date string based on the site's localization settings.
 *
 * @example
 * import { formatDate } from './formatDate';
 *
 * const dateToFormat = '2023-06-15T00:00:00Z';
 * const formattedDate = formatDate(dateToFormat);
 * console.log(formattedDate); // Output: "June 15, 2023"
 */
export function formatDate(date: string | number): string {
  return new Date(date).toLocaleDateString(siteConfig.geolocation.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
