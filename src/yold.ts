import { daysInMonth } from "./daysInMonth.js";
import { getLastDayOfYearDayOfWeek } from "./getLastDayOfYearDayOfWeek.js";
import { isLeapYear } from "./isLeapYear.js";

/**
 * Mask a year, ordinal, leap year, and day of week into a single number.
 *
 * The year is a 13-bit number, which allows for years from 1 to 9999.
 * The ordinal is a 9-bit number, which allows for 366 days in a year.
 * The leap year is a 1-bit number, which is 1 if it is a leap year, and 0 otherwise.
 * The day of week is a 3-bit number, which is 1 for Monday, 7 for Sunday.
 *
 * Totalling 26 bits, which fits into a javascript number which is a 64-bit floating point number.
 * The IEEE 754 standard for 64-bit floating point numbers has 53 bits of precision.
 * meaning that we do not have an issue with precision.
 * A larger year than 9999 is technically possible, but it is not supported by
 * this library which is intended for use with ISO 8601 dates which only go up to 9999.
 * Negative years are not supported.
 *
 * @param year The year, from 1 to 9999.
 * @param ordinal The ordinal, from 1 to 366.
 * @param leapYear 1 if year is a leap year, 0 otherwise.
 * @param dayOfWeek Day of the week for the last day of the year before this year. 1 for Monday, 7 for Sunday.
 */
export function mask(
	year: number,
	ordinal: number,
	leapYear: number,
	dayOfWeek: number,
): number {
	if (year < 1 || year > 9999) {
		throw new Error(
			`Invalid year: year must be greater than 0 but got ${year}`,
		);
	}
	if (ordinal < 1 || ordinal > 366) {
		throw new Error(
			`Invalid ordinal: ordinal must be between 1 and 366 but got ${ordinal}`,
		);
	}
	if (dayOfWeek < 1 || dayOfWeek > 7) {
		throw new Error(
			`Invalid day of week: day of week must be between 1 and 7 but got ${dayOfWeek}`,
		);
	}
	if (leapYear !== 0 && leapYear !== 1) {
		throw new Error(
			"Invalid leap year: leap year must be 0 or 1 but got ${leapYear}",
		);
	}
	const yearBits = year << 13;
	const ordinalBits = ordinal << 4;
	const leapYearBits = leapYear << 3;
	const dayOfWeekBits = dayOfWeek;
	const yold = yearBits | ordinalBits | leapYearBits | dayOfWeekBits;
	return yold;
}

/**
 * Ordinal takes up 9 bits required by max 366 days in a year.
 */
const ORDINAL_MASK = 0b111111111;
/**
 * Leap year takes up 1 bit. 1 if it is a leap year, 0 otherwise.
 */
const LEAP_YEAR_MASK = 0b1;
/**
 * Day of week takes up 3 bits. 1 for Monday, 7 for Sunday.
 */
const DAY_OF_WEEK_MASK_OF_DAY_BEFORE = 0b111;

/**
 * Get the year from a YOLD date.
 * @param yold The YOLD date.
 * @returns The year. From 1 to 9999.
 */
export function extractYear(yold: number): number {
	const year = yold >> 13;
	return year;
}

/**
 * Get the ordinal from a YOLD date.
 * @param yold The YOLD date.
 * @returns The ordinal. From 1 to 366.
 */
export function extractOrdinal(yold: number): number {
	const ordinal = (yold >> 4) & ORDINAL_MASK;
	return ordinal;
}

/**
 * Get the leap year from a YOLD date.
 * @param yold The YOLD date.
 * @returns 1 if it is a leap year, 0 otherwise.
 */
export function extractLeapYear(yold: number): number {
	const leapYear = (yold >> 3) & LEAP_YEAR_MASK;
	return leapYear;
}

/**
 * The day of week is the day of the week for the last day of the year before this year.
 * 1 for Monday, 7 for Sunday.
 * @param yold The YOLD date.
 * @returns The day of the week for the last day of the year before this year.
 */
export function extractDayOfWeekOfDayBefore(yold: number): number {
	const dayOfWeek = yold & DAY_OF_WEEK_MASK_OF_DAY_BEFORE;
	return dayOfWeek;
}

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

/**
 * Create a YOLD date from a year, month, and day.
 * @param year The year, from 1 to 9999.
 * @param month The month, from 1 to 12.
 * @param day The day, from 1 to 31.
 * @returns The YOLD date.
 */
export function fromYMD(year: number, month: number, day: number): number {
	if (year < 1) {
		throw new Error("Invalid year");
	}
	if (month < 1 || month > 12) {
		throw new Error("Invalid month");
	}
	const leapYear = isLeapYear(year) ? 1 : 0;
	if (day < 1 || day > daysInMonth(month, leapYear)) {
		throw new Error("Invalid date");
	}
	let ordinal = 0;
	while (month > 1) {
		ordinal += daysInMonth(month - 1, leapYear);
		month--;
	}
	ordinal += day;
	const dow = getLastDayOfYearDayOfWeek(year - 1);
	const yold = mask(year, ordinal, leapYear, dow);
	return yold;
}
