import { stringify, parse } from "../src/index.js";

describe('Date Standard test to', ()=> {
	it('stringify and parse undefined', ()=> {
		const computed = parse(stringify(undefined, 'YYYY-MM-DD hh:mm:ss.fff'));
		expect(computed).toBeNull();
	});
	it('stringify and parse null', ()=> {
		const computed = parse(stringify(null, 'YYYY-MM-DD hh:mm:ss.fff', true), true);
		expect(computed).toBeNull();
	});
	it('stringify and parse date-time', ()=> {
		const original = new Date('2001-01-01 00:10:00.101');
		const computed = parse(stringify(original, 'YYYY-MM-DD hh:mm:ss.fff'));
		expect(computed?.getTime()).toEqual(original.getTime());
	});
	it('stringify and parse utc date-time', ()=> {
		const original = new Date('2001-01-01 00:10:00.101Z');
		const computed = parse(stringify(original, 'YYYY-MM-DD hh:mm:ss.fff', true), true);
		expect(computed?.getTime()).toEqual(original.getTime());
	});
});
