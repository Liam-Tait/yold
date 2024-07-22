import { daysInMonth } from "./daysInMonth.js";
import { extractLeapYear, extractOrdinal, extractYear } from "./yold.js";

/**
 * Get the year, month, and day from a YOLD date.
 * @param yold The YOLD date.
 * @returns The year, month, and day as a tuple.
 */

export function getYearMonthDay(yold: number): [number, number, number] {
	const year = extractYear(yold);
	let day = extractOrdinal(yold);
	const leapYear = extractLeapYear(yold);
	let month = 1;
	while (day > daysInMonth(month, leapYear)) {
		day -= daysInMonth(month, leapYear);
		month++;
	}
	return [year, month, day];
}
