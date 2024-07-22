function ZellerCongruence(year: number, month: number, day: number): number {
	if (month === 1) {
		month = 13;
		year--;
	}
	if (month === 2) {
		month = 14;
		year--;
	}
	const q = day;
	const m = month;
	const k = year % 100;
	const j = Math.floor(year / 100);
	let h =
		q +
		Math.floor((13 * (m + 1)) / 5) +
		k +
		Math.floor(k / 4) +
		Math.floor(j / 4) +
		5 * j;
	h = h % 7;

	switch (h) {
		case 0: //Saturday
			return 6;
		case 1: // Sunday
			return 7;
		case 2: // Monday
			return 1;
		case 3: // Tuesday
			return 2;
		case 4: // Wednesday
			return 3;
		case 5: // Thursday
			return 4;
		case 6: // Friday
			return 5;
	}
	// prevent silent failure
	throw new Error("Error in Zellercongruence");
}

export function getLastDayOfYearDayOfWeek(year: number): number {
	return ZellerCongruence(
		year,
		12, // December
		31,
	);
}
