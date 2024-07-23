import { nextDay } from "./nextDay.js";

/**
 * Generate a sequence of yold dates from start to end (exclusive).
 * @param start yold start date
 * @param end yold end date
 * @returns a generator of yold dates
 */
export function* eachDateInRange(
	start: number,
	end: number,
): Generator<number> {
	let current = start;
	while (current < end) {
		yield current;
		current = nextDay(current);
	}
}
