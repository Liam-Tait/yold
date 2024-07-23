import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { eachDateInRange } from "../src/eachDateInRange.js";
import { toISOString } from "../src/iso.js";
import { fromYMD } from "../src/yold.js";

describe("eachDateInRange", () => {
	test("generates a sequence of yold dates from start to end (exclusive)", () => {
		const start = fromYMD(2025, 1, 1);
		const end = fromYMD(2025, 2, 1);
		const result = Array.from(eachDateInRange(start, end));
		assert.strictEqual(result.length, 31); // 31 days in January
		assert.deepStrictEqual(result.map(toISOString), [
			"2025-01-01",
			"2025-01-02",
			"2025-01-03",
			"2025-01-04",
			"2025-01-05",
			"2025-01-06",
			"2025-01-07",
			"2025-01-08",
			"2025-01-09",
			"2025-01-10",
			"2025-01-11",
			"2025-01-12",
			"2025-01-13",
			"2025-01-14",
			"2025-01-15",
			"2025-01-16",
			"2025-01-17",
			"2025-01-18",
			"2025-01-19",
			"2025-01-20",
			"2025-01-21",
			"2025-01-22",
			"2025-01-23",
			"2025-01-24",
			"2025-01-25",
			"2025-01-26",
			"2025-01-27",
			"2025-01-28",
			"2025-01-29",
			"2025-01-30",
			"2025-01-31",
		]);
	});
	test("generates no dates if start is equal to end", () => {
		const start = fromYMD(2025, 1, 1);
		const end = fromYMD(2025, 1, 1);
		const result = Array.from(eachDateInRange(start, end));
		assert.strictEqual(result.length, 0);
	});
	test("generates no dates if start is after end", () => {
		const start = fromYMD(2025, 1, 2);
		const end = fromYMD(2025, 1, 1);
		const result = Array.from(eachDateInRange(start, end));
		assert.strictEqual(result.length, 0);
	});
});
