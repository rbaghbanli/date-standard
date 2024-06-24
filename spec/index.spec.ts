import { stringify, parse } from "../src/index.js";

describe('Date Extension test to', ()=> {
	it('stringify and parse date-time', ()=> {
		const original = new Date('2001-01-01 00:10:00.101');
		const computed = parse(stringify(original, 'YYYY-MM-DD hh:mm:ss.uuu'));
		expect(computed.getTime()).toEqual(original.getTime());
	});
	it('stringify and parse utc date-time', ()=> {
		const original = new Date('2001-01-01 00:10:00.101Z');
		const computed = parse(stringify(original, 'YYYY-MM-DD hh:mm:ss.uuu', true), true);
		expect(computed.getTime()).toEqual(original.getTime());
	});
});
