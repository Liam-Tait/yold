# Yold

Yold is a zero-dependency library for working Naive ISO8061 dates.
A naive date refers to a date representation that does not take into account time zones, daylight saving time, or any other specific time-related considerations. It simply represents a date without any additional information about the time or location.

Avoid issues with timezones being automatically added with `new Date()`.

This library is designed for developers who need to work with ISO8061 date representations efficiently.

## Install

To install Yold, use npm:

```sh
npm install yold
```

## Usage

```typescript
import { fromISODate, nextDay, toISOString } from 'yold';
// Parse an ISO8061 date string
const date = fromISODate("2024-07-22");
// Get the next day
const theNextDay = nextDay(date);
// Convert the date object back to an ISO8061 string
const iso = toISOString(theNextDay);
// Output the result
console.log(iso); // 2024-07-23
```



YOLD dates are ordered so you can use operators as you would with numbers
```typescript
const d1 = fromISODate("2024-07-22");
const d2 = nextDay(d1);
console.log(d1 === d2);
console.log(d1 < d2); 
console.log(d1 > d2);
```


## Why Yold

Yold stores date information by masking date components into a single number.

- **Y**ear: 13-bit number - year values ranging from 1 to 9999.
- **O**rdinal: 9-bit number - day values ranging from 1 to 366, accommodating leap years.
- **L**eap Year: 1-bit number - if a year is a leap year
- **D**ay of the Week: 3-bit number - day of the week for the last day of the year before this year.