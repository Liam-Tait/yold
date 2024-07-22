import {
	extractYear,
	extractOrdinal,
	extractLeapYear,
	extractDayOfWeekOfDayBefore,
	mask,
} from "./yold";
import { isLeapYear } from "./isLeapYear";

/**
 * Get the next day
 *
 * @param yold date in YOLD format
 * @returns next day in YOLD format
 */
export function nextDay(yold: number): number {
	let year = extractYear(yold);
	let ordinal = extractOrdinal(yold);
	let leapYear = extractLeapYear(yold);
	let dayOfWeekOfDayBefore = extractDayOfWeekOfDayBefore(yold);
	if (ordinal === 366 || (ordinal === 365 && !leapYear)) {
		// last day of the year
		dayOfWeekOfDayBefore = (dayOfWeekOfDayBefore + ordinal) % 7;
		if (dayOfWeekOfDayBefore === 0) {
			dayOfWeekOfDayBefore = 7;
		}
		year++;
		ordinal = 1;
	} else {
		ordinal++;
	}
	leapYear = isLeapYear(year) ? 1 : 0;
	return mask(year, ordinal, leapYear, dayOfWeekOfDayBefore);
}
