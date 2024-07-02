export type StandardFormat = 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' | 'hh:mm' | 'hh:mm:ss' | 'hh:mm:ss.fff' | 'YYYY-MM-DD hh:mm' | 'YYYY-MM-DD hh:mm:ss' | 'YYYY-MM-DD hh:mm:ss.fff';

/**
	Returns formatted string, local or UTC.
	@param value Date value to stringify.
	@param format 'YYYY', 'YYYY-MM', 'YYYY-MM-DD', 'hh:mm', 'hh:mm:ss', 'hh:mm:ss.fff', 'YYYY-MM-DD hh:mm:ss', 'YYYY-MM-DD hh:mm:ss.fff'.
	@param utc True for UTC, omit or false for local.
	@returns Formatted string.
*/
export function stringify(value: Date | null | undefined, format: StandardFormat, utc?: boolean): string | null {
	if (!value) {
		return null;
	}
	switch (format) {
		case 'YYYY': return utc
			? value.getUTCFullYear().toString().padStart(4, '0')
			: value.getFullYear().toString().padStart(4, '0');
		case 'YYYY-MM': return utc
			? `${value.getUTCFullYear().toString().padStart(4, '0')}-${(value.getUTCMonth() + 1).toString().padStart(2, '0')}`
			: `${value.getFullYear().toString().padStart(4, '0')}-${(value.getMonth() + 1).toString().padStart(2, '0')}`;
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
	Returns Date parsed from the string, local or UTC.
	@param value String value in YYYY-MM[-DD[ hh:mm[:ss[.fff]]]] format.
	@param utc True to parse string as UTC, omit or false to parse it as local.
	@returns Parsed Date.
*/
export function parse(value: string | null | undefined, utc?: boolean): Date | null {
	if (!value) {
		return null;
	}
	if (utc) {
		switch (value.length) {
			case 16: return new Date(`${value}:00.000Z`);
			case 19: return new Date(`${value}.000Z`);
			default: {
				if (value.length > 22) {
					return new Date(`${value.substring(0, 23)}Z`);
				}
			}
		}
	}
	else {
		switch (value.length) {
			case 4: return new Date(`${value}-01-01 00:00`);
			case 7: return new Date(`${value}-01 00:00`);
			case 10: return new Date(`${value} 00:00`);
		}
	}
	return new Date(value);
}
