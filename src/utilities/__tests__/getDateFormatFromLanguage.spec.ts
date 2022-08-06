import {getDateFormatFromLanguage} from '../getDateFormatFromLanguage';

describe('#getDateFormatFromLanguage', () => {
  test.each`
    language | expected
    ${'en'}  | ${'MM/DD/YYYY'}
    ${'ar'}  | ${'DD/MM/YYYY'}
    ${'da'}  | ${'DD/MM/YYYY'}
    ${'de'}  | ${'DD/MM/YYYY'}
    ${'es'}  | ${'DD/MM/YYYY'}
    ${'fr'}  | ${'DD/MM/YYYY'}
    ${'hi'}  | ${'DD/MM/YYYY'}
    ${'id'}  | ${'DD/MM/YYYY'}
    ${'it'}  | ${'DD/MM/YYYY'}
    ${'nb'}  | ${'DD/MM/YYYY'}
    ${'nl'}  | ${'DD/MM/YYYY'}
    ${'pl'}  | ${'DD/MM/YYYY'}
    ${'pt'}  | ${'DD/MM/YYYY'}
    ${'ro'}  | ${'DD/MM/YYYY'}
    ${'sv'}  | ${'DD/MM/YYYY'}
    ${'ja'}  | ${'YYYY/MM/DD'}
    ${'ko'}  | ${'YYYY/MM/DD'}
    ${'zh'}  | ${'YYYY/MM/DD'}
  `('returns $expected for $language', ({language, expected}) => {
    expect(getDateFormatFromLanguage(language)).toBe(expected);
  });
});
