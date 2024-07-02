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
	it('stringify local year', ()=> {
		const original = '2000';
		const computed = stringify(parse(original), 'YYYY');
		expect(computed).toEqual(original);
	});
	it('stringify local date', ()=> {
		const original = '2001-02-03';
		const computed = stringify(parse(original), 'YYYY-MM-DD');
		expect(computed).toEqual(original);
	});
	it('stringify local time', ()=> {
		const original = '05:06';
		const computed = stringify(parse('2002-03-04 ' + original), 'hh:mm');
		expect(computed).toEqual(original);
	});
	it('stringify utc year', ()=> {
		const original = '2000';
		const computed = stringify(parse(original, true), 'YYYY', true);
		expect(computed).toEqual(original);
	});
	it('stringify utc date', ()=> {
		const original = '2001-02-03';
		const computed = stringify(parse(original, true), 'YYYY-MM-DD', true);
		expect(computed).toEqual(original);
	});
	it('stringify utc time', ()=> {
		const original = '05:06';
		const computed = stringify(parse('2002-03-04 ' + original, true), 'hh:mm', true);
		expect(computed).toEqual(original);
	});
});
