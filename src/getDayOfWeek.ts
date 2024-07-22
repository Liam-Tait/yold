import { extractDayOfWeekOfDayBefore, extractOrdinal } from ".";

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
	const dayOfWeek = extractDayOfWeekOfDayBefore(yold);
	const ordinal = extractOrdinal(yold);
	let dow = (dayOfWeek + ordinal) % 7;
	if (dow === 0) {
		dow = 7;
	}
	return dow;
}
