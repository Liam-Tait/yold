import { describe, test, expect } from "vitest";
import {
	mask,
	fromYMD,
	extractYear,
	extractDayOfWeekOfDayBefore,
	extractLeapYear,
	extractOrdinal,
	daysInMonth,
	getYearMonthDay,
} from "../src/yold.js";
import { isLeapYear } from "../src/isLeapYear.js";
import { nextDay } from "../src/nextDay.js";
import { toISOString } from "../src/iso.js";

function formatISO(date: Date): string {
	return date.toISOString().split("T")[0];
}

function addDay(date: Date): Date {
	const next = new Date(date);
	next.setDate(next.getDate() + 1);
	return next;
}

test("iso output matches Date", () => {
	for (let year = 1990; year <= 2030; year++) {
		const leapYear = isLeapYear(year) ? 1 : 0;
		for (let month = 1; month <= 12; month++) {
			const total = daysInMonth(month, leapYear);
			for (let day = 1; day <= total; day++) {
				const yold = fromYMD(year, month, day);
				const iso = toISOString(yold);
				const date = new Date(iso);
				expect(date.getFullYear()).to.eq(year);
				expect(date.getMonth()).to.eq(month - 1);
				expect(date.getDate()).to.eq(day);
				const formatted = formatISO(date);
				expect(iso).to.eq(formatted);
			}
		}
	}
});

test("nextDay", () => {
	let yold = fromYMD(2023, 1, 1);
	let date = new Date(toISOString(yold));

	const end = fromYMD(2026, 1, 1);
	while (yold < end) {
		yold = nextDay(yold);
		date = addDay(date);
		const [year, month, day] = getYearMonthDay(yold);
		expect(year).to.eq(date.getFullYear());
		expect(month).to.eq(date.getMonth() + 1);
		expect(day).to.eq(date.getDate());
	}
});

describe("mask and extract", () => {
	describe("mask", () => {
		test("negative year", () => {
			expect(() => mask(-1, 1, 1, 7)).to.throw();
		});
		test("ordinal < 1", () => {
			expect(() => mask(1, 0, 1, 7)).to.throw();
			expect(() => mask(1, -1, 1, 7)).to.throw();
		});

		test("ordinal > 366", () => {
			expect(() => mask(1, 367, 1, 7)).to.throw();
		});

		test("dayOfWeekOfDayBefore < 1", () => {
			expect(() => mask(1, 1, 1, 0)).to.throw();
			expect(() => mask(1, 1, 1, -1)).to.throw();
		});

		test("dayOfWeekOfDayBefore > 7", () => {
			expect(() => mask(1, 1, 1, 8)).to.throw();
		});

		test("leapYear < 0", () => {
			expect(() => mask(1, 1, -1, 7)).to.throw();
		});

		test("leapYear > 1", () => {
			expect(() => mask(1, 1, 2, 7)).to.throw();
		});
	});
	test("year", () => {
		const yold = mask(2024, 1, 1, 7);
		expect(extractYear(yold)).to.eq(2024);
	});

	test("ordinal", () => {
		const yold = mask(2024, 1, 1, 7);
		expect(extractOrdinal(yold)).to.eq(1);
	});

	test("dayOfWeekOfDayBefore", () => {
		const yold = mask(2024, 1, 1, 7);
		expect(extractDayOfWeekOfDayBefore(yold)).to.eq(7);
	});

	test("leapYear", () => {
		const yold = mask(2024, 1, 1, 7);
		expect(extractLeapYear(yold)).to.eq(1);
	});
});

describe("ordering", () => {
	test("nextDay is greater than", () => {
		let count = 1_000;
		let yold = fromYMD(2000, 1, 1);
		while (count--) {
			const next = nextDay(yold);
			expect(next).to.be.greaterThan(yold);
			yold = next;
		}
	});
});

describe("isoDate", () => {
	test("fromYMD and isoDate", () => {
		const yold = fromYMD(2024, 1, 1);
		const date = toISOString(yold);
		expect(date).to.eq("2024-01-01");
	});

	test("fromYMD and isoDate", () => {
		const yold = fromYMD(2024, 12, 31);
		const date = toISOString(yold);
		expect(date).to.eq("2024-12-31");
	});
});

describe("nextDay", () => {
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
});
