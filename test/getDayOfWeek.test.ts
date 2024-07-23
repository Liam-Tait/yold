import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DOW } from "../src/constants.js";
import { getDayOfWeek } from "../src/getDayOfWeek.js";
import { fromYMD } from "../src/yold.js";

describe("getDayOfWeek", () => {
	test("returns the day of the week for a given yold date", () => {
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 22)), DOW.Mon);
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 23)), DOW.Tue);
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 24)), DOW.Wed);
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 25)), DOW.Thu);
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 26)), DOW.Fri);
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 27)), DOW.Sat);
		assert.strictEqual(getDayOfWeek(fromYMD(2024, 7, 28)), DOW.Sun);
		assert.strictEqual(getDayOfWeek(fromYMD(2025, 1, 1)), DOW.Wed);
		assert.strictEqual(getDayOfWeek(fromYMD(2025, 4, 11)), DOW.Fri);
		assert.strictEqual(getDayOfWeek(fromYMD(2025, 12, 31)), DOW.Wed);
		assert.strictEqual(getDayOfWeek(fromYMD(2100, 1, 2)), DOW.Sat);
	});
});
