import { getYearMonthDay } from "./getYearMonthDay.js";
import { fromYMD } from "./yold.js";

/**
 * Convert an ISO date string to a YOLD date.
 *
 * @param isoDateString The ISO8061 date string to convert.
 * @returns The YOLD date.
 */
export function fromISODate(isoDateString: string): number {
	const [yearStr, monthStr, dayStr] = isoDateString.split("-", 3);

	const year = Number(yearStr);
	const month = Number(monthStr);
	const day = Number(dayStr);
	if (
		Number.isNaN(year) ||
		Number.isNaN(month) ||
		Number.isNaN(day) ||
		!Number.isInteger(year) ||
		!Number.isInteger(month) ||
		!Number.isInteger(day)
	) {
		throw new Error(`Invalid ISO date string: ${isoDateString}`);
	}
	return fromYMD(year, month, day);
}

/**
 * Convert a YOLD date to an ISO 8601 date string.
 * @param yold The YOLD date to convert.
 * @returns The ISO 8601 date string.
 */
export function toISOString(yold: number): string {
	const [year, month, day] = getYearMonthDay(yold);
	const yearStr = year.toString().padStart(4, "0");
	const monthStr = month.toString().padStart(2, "0");
	const dayStr = day.toString().padStart(2, "0");
	return `${yearStr}-${monthStr}-${dayStr}`;
}
