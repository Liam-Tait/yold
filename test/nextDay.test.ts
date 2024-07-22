import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { nextDay } from "../src/nextDay.js";
import { extractYear, fromYMD, getYearMonthDay } from "../src/yold.js";

describe("nextDay", () => {
	test("returns the next day", () => {
		const date = fromYMD(2000, 1, 1);
		const next = nextDay(date);
		const [year, month, day] = getYearMonthDay(next);
		assert.strictEqual(year, 2000);
		assert.strictEqual(month, 1);
		assert.strictEqual(day, 2);
	});
    test("returns the next day in the next month", () => {
        const date = fromYMD(2000, 1, 31);
        const next = nextDay(date);
        const [year, month, day] = getYearMonthDay(next);
        assert.strictEqual(year, 2000);
        assert.strictEqual(month, 2);
        assert.strictEqual(day, 1);
    });
    test("returns the next day in the next year", () => {
        const date = fromYMD(2000, 12, 31);
        const next = nextDay(date);
        const [year, month, day] = getYearMonthDay(next);
        assert.strictEqual(year, 2001);
        assert.strictEqual(month, 1);
        assert.strictEqual(day, 1);
    });
});
