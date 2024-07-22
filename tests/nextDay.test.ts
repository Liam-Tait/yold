import { describe, expect, test } from "vitest";
import { nextDay } from "../src/nextDay.js";
import {
	extractDayOfWeekOfDayBefore,
	extractLeapYear,
	extractOrdinal,
	extractYear,
	fromYMD,
} from "../src/yold.js";

test("nextDay", () => {
	const yold = fromYMD(2024, 1, 1);
	const next = nextDay(yold);
	expect(extractYear(yold)).to.eq(2024);
	expect(extractOrdinal(yold)).to.eq(1);
	expect(extractDayOfWeekOfDayBefore(yold)).to.eq(7);
	expect(extractLeapYear(yold)).to.eq(1);

	expect(extractYear(next)).to.eq(2024);
	expect(extractOrdinal(next)).to.eq(2);
	expect(extractDayOfWeekOfDayBefore(next)).to.eq(7);
	expect(extractLeapYear(next)).to.eq(1);
	expect(next).to.eq(fromYMD(2024, 1, 2));
});

test("cross-year leap -> common", () => {
	const yold = fromYMD(2024, 12, 31);
	const next = nextDay(yold);
	expect(extractYear(next)).to.eq(2025);
	expect(next).to.eq(fromYMD(2025, 1, 1));
});

test("cross-year common -> common", () => {
	const yold = fromYMD(2025, 12, 31);
	const next = nextDay(yold);
	expect(extractYear(next)).to.eq(2026);
	expect(next).to.eq(fromYMD(2026, 1, 1));
});
