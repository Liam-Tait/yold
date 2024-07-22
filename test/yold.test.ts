import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
	mask,
	extractYear,
	extractOrdinal,
	extractLeapYear,
	extractDayOfWeekOfDayBefore,
} from "../src/yold.js";
import { isLeapYear } from "../src/isLeapYear.js";
import { getLastDayOfYearDayOfWeek } from "../src/getLastDayOfYearDayOfWeek.js";

describe("mask & extract", () => {
	test("extracts the same year, ordinal, leapYear, dow as masked", () => {
		// Test all valid date values for year, ordinal, leapYear, and dow
		// to ensure that the mask and extract functions are inverses.
		for (let year = 1; year <= 9999; year++) {
			const leapYear = isLeapYear(year) ? 1 : 0;
			const dow = getLastDayOfYearDayOfWeek(year);
            const maxOrdinal = leapYear ? 366 : 365;
			for (let ordinal = 1; ordinal <= maxOrdinal; ordinal++) {
				const date = mask(year, ordinal, leapYear, dow);
				const extractedYear = extractYear(date);
				const extractedOrdinal = extractOrdinal(date);
				const extractedLeapYear = extractLeapYear(date);
				const extractedDow = extractDayOfWeekOfDayBefore(date);

                assert.strictEqual(typeof date, "number");
				assert.strictEqual(extractedYear, year);
				assert.strictEqual(extractedOrdinal, ordinal);
				assert.strictEqual(extractedLeapYear, leapYear);
				assert.strictEqual(extractedDow, dow);
			}
		}
	});
});
