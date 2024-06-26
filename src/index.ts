/**
	Returns formatted date, time or date-time string.
	@param value Date to stringify.
	@param format 'YYYY-MM-DD', 'hh:mm', 'hh:mm:ss', 'hh:mm:ss.fff', 'YYYY-MM-DD hh:mm:ss', 'YYYY-MM-DD hh:mm:ss.fff'.
	@param utc True for UTC, false for local.
	@returns Formatted date or date-time string.
*/
export function stringify(value: Date | null | undefined,
	format: 'YYYY-MM' | 'YYYY-MM-DD' | 'hh:mm' | 'hh:mm:ss' | 'hh:mm:ss.fff' | 'YYYY-MM-DD hh:mm' | 'YYYY-MM-DD hh:mm:ss' | 'YYYY-MM-DD hh:mm:ss.fff',
	utc?: boolean): string | null {
	if (!value) {
		return null;
	}
	switch (format) {
		case 'YYYY-MM': return utc
			? `${value.getUTCFullYear().toString()}-${(value.getUTCMonth() + 1).toString().padStart(2, '0')}`
			: `${value.getFullYear().toString()}-${(value.getMonth() + 1).toString().padStart(2, '0')}`;
		case 'YYYY-MM-DD': return `${stringify(value, 'YYYY-MM', utc)}-${(utc ? value.getUTCDate() : value.getDate()).toString().padStart(2, '0')}`;
		case 'hh:mm': return utc
			? `${value.getUTCHours().toString().padStart(2, '0')}:${value.getUTCMinutes().toString().padStart(2, '0')}`
			: `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
		case 'hh:mm:ss': return `${stringify(value, 'hh:mm', utc)}:${(utc ? value.getUTCSeconds() : value.getSeconds()).toString().padStart(2, '0')}`;
		case 'hh:mm:ss.fff': return `${stringify(value, 'hh:mm:ss', utc)}.${(utc ? value.getUTCMilliseconds() : value.getMilliseconds()).toString().padStart(3, '0')}`;
		case 'YYYY-MM-DD hh:mm': return `${stringify(value, 'YYYY-MM-DD', utc)} ${stringify(value, 'hh:mm', utc)}`;
		case 'YYYY-MM-DD hh:mm:ss': return `${stringify(value, 'YYYY-MM-DD', utc)} ${stringify(value, 'hh:mm:ss', utc)}`;
		default: return `${stringify(value, 'YYYY-MM-DD', utc)} ${stringify(value, 'hh:mm:ss.fff', utc)}`;
	}
}

/**
	Returns parsed Date from formatted date or date-time string.
	@param value Date or date-time string in YYYY-MM[-DD[hh:mm[:ss[.fff]]]] format.
	@param utc True to parse string as UTC date or date-time, false to parse it as local.
	@returns Parsed Date, throws Error if invalid parameter format.
*/
export function parse(value: string | null | undefined,
	utc?: boolean): Date | null {
	if (!value) {
		return null;
	}
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
