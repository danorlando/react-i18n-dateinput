export function getDateFormatFromLanguage(language: string) {
  let code = '';
  if (language === 'en-GB' || 'en-NZ' || 'en-IE' || 'en-ZA' || 'en-AU')  {
    return 'dd/mm/yyyy';
  } else {
     code = language.substring(0, 2);
  }

  switch (code) {
    case 'en':
      return 'MM/DD/YYYY';
    case 'ar':
    case 'da':
    case 'de':
    case 'es':
    case 'fr':
    case 'hi':
    case 'id':
    case 'it':
    case 'nb':
    case 'nl':
    case 'pl':
    case 'pt':
    case 'ro':
    case 'sv':
      return 'DD/MM/YYYY';
    case 'ja':
    case 'ko':
    case 'zh':
      return 'YYYY/MM/DD';
    default:
      return 'MM/DD/YYYY';
  }
}
