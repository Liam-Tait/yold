import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { daysInMonth } from "../src/daysInMonth.js";
import { getYearMonthDay } from "../src/getYearMonthDay.js";
import { isLeapYear } from "../src/isLeapYear.js";
import { fromYMD } from "../src/yold.js";

describe("getYearMonthDay", () => {
	test("returns the same year, month, and day as the input fromYMD", () => {
		for (let year = 1; year <= 9999; year++) {
			const leapYear = isLeapYear(year) ? 1 : 0;
			for (let month = 1; month <= 12; month++) {
				const maxDay = daysInMonth(month, leapYear);
				for (let day = 1; day <= maxDay; day++) {
					const yold = fromYMD(year, month, day);
					const [extractedYear, extractedMonth, extractedDay] =
						getYearMonthDay(yold);
					assert.strictEqual(extractedYear, year);
					assert.strictEqual(extractedMonth, month);
					assert.strictEqual(extractedDay, day);
				}
			}
		}
	});
});
