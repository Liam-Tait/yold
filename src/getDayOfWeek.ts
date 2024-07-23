import { extractDayOfWeekOfDayBefore, extractOrdinal } from "./yold.js";

/**
 * Get the day of the week for a given YOLD date.
 *
 * 1 = Monday,
 * 2 = Tuesday,
 * 3 = Wednesday,
 * 4 = Thursday,
 * 5 = Friday,
 * 6 = Saturday
 * 7 = Sunday,
 *
 * @param yold The YOLD date.
 * @returns The 1-indexed day of the week for the given YOLD date.
 */
export function getDayOfWeek(yold: number): number {
	const lastDayPreviousYear = extractDayOfWeekOfDayBefore(yold);
	const ordinal = extractOrdinal(yold);
	let dow = (lastDayPreviousYear + ordinal) % 7;
	// # Adjust for the modulus result to fit the 1 to 7 range
	if (dow === 0) {
		dow = 7;
	}
	return dow;
}
