/**
	Returns formatted date, time or date-time string.
	@param date Date to stringify.
	@param format 'YYYY-MM-DD', 'hh:mm', 'hh:mm:ss', 'hh:mm:ss.fff', 'YYYY-MM-DD hh:mm:ss', 'YYYY-MM-DD hh:mm:ss.fff'.
	@param utc True for UTC, false for local.
	@returns Formatted date or date-time string.
*/
export function stringify(date: Date,
	format: 'YYYY-MM' | 'YYYY-MM-DD' | 'hh:mm' | 'hh:mm:ss' | 'hh:mm:ss.fff' | 'YYYY-MM-DD hh:mm' | 'YYYY-MM-DD hh:mm:ss' | 'YYYY-MM-DD hh:mm:ss.fff',
	utc?: boolean): string {
	switch (format) {
	case 'YYYY-MM': return utc
		? `${date.getUTCFullYear().toString()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}`
		: `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
	case 'YYYY-MM-DD': return `${stringify(date, 'YYYY-MM', utc)}-${(utc ? date.getUTCDate() : date.getDate()).toString().padStart(2, '0')}`;
	case 'hh:mm': return utc
		? `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
		: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
	case 'hh:mm:ss': return `${stringify(date, 'hh:mm', utc)}:${(utc ? date.getUTCSeconds() : date.getSeconds()).toString().padStart(2, '0')}`;
	case 'hh:mm:ss.fff': return `${stringify(date, 'hh:mm:ss', utc)}.${(utc ? date.getUTCMilliseconds() : date.getMilliseconds()).toString().padStart(3, '0')}`;
	case 'YYYY-MM-DD hh:mm': return `${stringify(date, 'YYYY-MM-DD', utc)} ${stringify(date, 'hh:mm', utc)}`;
	case 'YYYY-MM-DD hh:mm:ss': return `${stringify(date, 'YYYY-MM-DD', utc)} ${stringify(date, 'hh:mm:ss', utc)}`;
	default: return `${stringify(date, 'YYYY-MM-DD', utc)} ${stringify(date, 'hh:mm:ss.fff', utc)}`;
	}
}

/**
	Returns parsed Date from formatted date or date-time string.
	@param value Date or date-time string in YYYY-MM[-DD[hh:mm[:ss[.fff]]]] format.
	@param utc True to parse string as UTC date or date-time, false to parse it as local.
	@returns Parsed Date, throws Error if invalid parameter format.
*/
export function parse(value: string, utc?: boolean): Date {
	if (utc) {
		switch (value.length) {
		case 7: return new Date(`${value}-01 00:00:00.000Z`);
		case 10: return new Date(`${value} 00:00:00.000Z`);
		case 16: return new Date(`${value}:00.000Z`);
		case 19: return new Date(`${value}.000Z`);
		default: {
			if (value.length > 22) {
				return new Date(`${value.substring(0, 23)}Z`);
			}
			throw new Error(`invalid parameter '${value}'`);
		}
		}
	}
	else {
		return new Date(value);
	}
}
