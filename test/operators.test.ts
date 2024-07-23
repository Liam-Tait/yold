import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { toISOString } from "../src/iso.js";
import { fromYMD } from "../src/yold.js";

describe("comparing a yold date", () => {
	test("yold <", () => {
		const a = fromYMD(2025, 1, 1);
		const b = fromYMD(2025, 1, 2);
		assert.strictEqual(a < b, true);
		assert.strictEqual(b < a, false);
	});

	test("yold >", () => {
		const a = fromYMD(2000, 1, 1);
		const b = fromYMD(224, 1, 1);
		assert.strictEqual(a > b, true);
		assert.strictEqual(b > a, false);
	});

	test("yold ===", () => {
		const a = fromYMD(2025, 1, 1);
		const b = fromYMD(2025, 1, 1);
		assert.strictEqual(a === b, true);
	});

	test("yold <=", () => {
		const a = fromYMD(2025, 1, 1);
		const b = fromYMD(2025, 1, 1);
		const c = fromYMD(2025, 1, 2);
		assert.strictEqual(a <= b, true);
		assert.strictEqual(a <= c, true);
	});

	test("yold >=", () => {
		const a = fromYMD(2024, 1, 1);
		const b = fromYMD(2024, 1, 1);
		const c = fromYMD(2030, 1, 2);
		assert.strictEqual(a >= b, true);
		assert.strictEqual(c >= a, true);
	});

	test("can be sorted like a numer", () => {
		const dates = [
			fromYMD(2030, 1, 1),
			fromYMD(2025, 1, 3),
			fromYMD(2025, 1, 2),
			fromYMD(2022, 1, 4),
			fromYMD(2000, 1, 5),
		]
			.sort((a, b) => a - b)
			.map(toISOString);
		assert.deepStrictEqual(dates, [
			"2000-01-05",
			"2022-01-04",
			"2025-01-02",
			"2025-01-03",
			"2030-01-01",
		]);
	});
});
