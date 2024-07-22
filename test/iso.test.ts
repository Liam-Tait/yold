import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { fromISODate, toISOString } from "../src/iso.js";
import {
	extractDayOfWeekOfDayBefore,
	extractLeapYear,
	extractOrdinal,
	extractYear,
	fromYMD,
} from "../src/yold.js";

describe("fromISODate", () => {
	test("converts an ISO date string to a YOLD date", () => {
		const date = fromISODate("2024-01-01");
		const year = extractYear(date);
		const ordinal = extractOrdinal(date);
		const leapYear = extractLeapYear(date);
		const dow = extractDayOfWeekOfDayBefore(date);

		assert.strictEqual(year, 2024);
		assert.strictEqual(ordinal, 1); // January 1st
		assert.strictEqual(leapYear, 1); // 2024 is a leap year
		assert.strictEqual(dow, 7); // Sunday
	});
	test("0 year throws", () => {
		assert.throws(() => fromISODate("0000-01-01"));
	});
	test("year > 9999 throws", () => {
		assert.throws(() => fromISODate("10000-01-01"));
	});
	test("0 month throws", () => {
		assert.throws(() => fromISODate("2000-00-01"));
	});
	test("month > 13 throws", () => {
		assert.throws(() => fromISODate("2000-13-01"));
	});
	test("0 day throws", () => {
		assert.throws(() => fromISODate("2000-01-00"));
	});
	test("day throws when larger than allowed for the month and year", () => {
		assert.throws(() => fromISODate("2000-01-32")); // Jan has 31 days
		assert.throws(() => fromISODate("1999-02-29")); // Feb 1999 has 28 days
		assert.throws(() => fromISODate("2000-02-30")); // Feb 2000 has 29 days
		assert.throws(() => fromISODate("2000-03-32")); // Mar has 31 days
		assert.throws(() => fromISODate("2000-04-31")); // Apr has 30 days
		assert.throws(() => fromISODate("2000-05-32")); // May has 31 days
		assert.throws(() => fromISODate("2000-06-31")); // Jun has 30 days
		assert.throws(() => fromISODate("2000-07-32")); // Jul has 31 days
		assert.throws(() => fromISODate("2000-08-32")); // Aug has 31 days
		assert.throws(() => fromISODate("2000-09-31")); // Sep has 30 days
		assert.throws(() => fromISODate("2000-10-32")); // Oct has 31 days
		assert.throws(() => fromISODate("2000-11-31")); // Nov has 30 days
		assert.throws(() => fromISODate("2000-12-32")); // Dec has 31 days
	});
	test("full iso date throws", () => {
		assert.throws(() => fromISODate("2024-01-01T00:00:00"));
	});
	test("missing dashes throws", () => {
		assert.throws(() => fromISODate("2024121"));
	});

	test("partial iso date throws", () => {
		assert.throws(() => fromISODate("2024-01"));
	});
});

describe("toISOString", () => {
	test("converts a YOLD date to an ISO date string", () => {
		const date = fromYMD(2020, 2, 20);
		assert.strictEqual(toISOString(date), "2020-02-20");
	});
});
