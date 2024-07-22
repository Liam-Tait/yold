import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { isLeapYear } from "../src/isLeapYear.js";

describe("isLeapYear", () => {
	test("returns true for leap years", () => {
		assert.strictEqual(isLeapYear(2000), true);
		assert.strictEqual(isLeapYear(2004), true);
		assert.strictEqual(isLeapYear(2008), true);
		assert.strictEqual(isLeapYear(2012), true);
		assert.strictEqual(isLeapYear(2016), true);
		assert.strictEqual(isLeapYear(2020), true);
		assert.strictEqual(isLeapYear(2024), true);
	});
	test("returns false for non-leap years", () => {
		assert.strictEqual(isLeapYear(2001), false);
		assert.strictEqual(isLeapYear(2002), false);
		assert.strictEqual(isLeapYear(2003), false);
		assert.strictEqual(isLeapYear(2005), false);
		assert.strictEqual(isLeapYear(2006), false);
		assert.strictEqual(isLeapYear(2007), false);
		assert.strictEqual(isLeapYear(2009), false);
	});
});
