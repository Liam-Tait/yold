import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { daysInMonth } from "../src/daysInMonth.js";

describe("daysInMonth", () => {
	test("returns 31 for January", () => {
        assert.strictEqual(daysInMonth(1, 0), 31);
		assert.strictEqual(daysInMonth(1, 1), 31);
	});
	test("returns 29 for February in a leap year", () => {
		assert.strictEqual(daysInMonth(2, 1), 29);
	});
	test("returns 28 for February in a common year", () => {
		assert.strictEqual(daysInMonth(2, 0), 28);
	});
	test("returns 31 for March", () => {
        assert.strictEqual(daysInMonth(3, 0), 31);
		assert.strictEqual(daysInMonth(3, 1), 31);
	});
	test("returns 30 for April", () => {
        assert.strictEqual(daysInMonth(4, 0), 30);
		assert.strictEqual(daysInMonth(4, 1), 30);
	});
	test("returns 31 for May", () => {
        assert.strictEqual(daysInMonth(5, 0), 31);
		assert.strictEqual(daysInMonth(5, 1), 31);
	});
	test("returns 30 for June", () => {
        assert.strictEqual(daysInMonth(6, 0), 30);
		assert.strictEqual(daysInMonth(6, 1), 30);
	});
	test("returns 31 for July", () => {
        assert.strictEqual(daysInMonth(7, 0), 31);
		assert.strictEqual(daysInMonth(7, 1), 31);
	});
	test("returns 31 for August", () => {
        assert.strictEqual(daysInMonth(8, 0), 31);
		assert.strictEqual(daysInMonth(8, 1), 31);
	});
	test("returns 30 for September", () => {
        assert.strictEqual(daysInMonth(9, 0), 30);
		assert.strictEqual(daysInMonth(9, 1), 30);
	});
	test("returns 31 for October", () => {
        assert.strictEqual(daysInMonth(10, 0), 31);
		assert.strictEqual(daysInMonth(10, 1), 31);
	});
	test("returns 30 for November", () => {
        assert.strictEqual(daysInMonth(11, 0), 30);
		assert.strictEqual(daysInMonth(11, 1), 30);
	});
	test("returns 31 for December", () => {
		assert.strictEqual(daysInMonth(12, 0), 31);
        assert.strictEqual(daysInMonth(12, 1), 31);
	});
});
