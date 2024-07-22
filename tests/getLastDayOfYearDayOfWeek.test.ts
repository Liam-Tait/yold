import { expect, test } from "vitest";
import { getLastDayOfYearDayOfWeek } from "../src/getLastDayOfYearDayOfWeek";


const DOW = {
    MON: 1,
    TUE: 2,
    WED: 3,
    Thu: 4,
    FRI: 5,
    SAT: 6,
    SUN: 7,
};

test.each([
    [300, DOW.MON],
    [1000, DOW.WED],
    [1900, DOW.MON],
    [2020, DOW.Thu],
    [2021, DOW.FRI],
    [2023, DOW.SUN],
    [2030, DOW.TUE],
    [3000, DOW.WED],
    [3210, DOW.FRI],
    [9999, DOW.FRI],
])("getLastDayOfYearDayOfWeek(%d) === %d", (year, expected) => {
    expect(getLastDayOfYearDayOfWeek(year)).toBe(expected);
});