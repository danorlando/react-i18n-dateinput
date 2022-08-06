import {reformatStringDateToISO} from '../reformatStringDateToISO';

test('reformatStringDateToISO ==> Returns ISO formatted string date for MM/DD/YYYY', () => {
  const expected = '2019-12-30';
  const actual = reformatStringDateToISO('12/30/2019', 'en');
  expect(actual).toBe(expected);
});

test('reformatStringDateToISO ==> Returns ISO formatted string date for YYYY/MM/DD', () => {
  const expected = '2019-12-30';
  const actual = reformatStringDateToISO('2019/12/30', 'ko');
  expect(actual).toBe(expected);
});

test('reformatStringDateToISO ==> Returns ISO formatted string date for DD/MM/YYYY', () => {
  const expected = '2019-12-30';
  const actual = reformatStringDateToISO('30/12/2019', 'it');
  expect(actual).toBe(expected);
});
