/**
 * Get the number of days in a month.
 * @param month The month, from 1 to 12. 1 is January, 12 is December.
 * @param leapYear 1 if it is a leap year, 0 otherwise.
 * @returns The number of days in the month.
 */

export function daysInMonth(month: number, leapYear: number): number {
	switch (month) {
		case 2: // February
			return leapYear ? 29 : 28;
		case 4: // April
		case 6: // June
		case 9: // September
		case 11: // November
			return 30;
		default:
			return 31;
	}
}
