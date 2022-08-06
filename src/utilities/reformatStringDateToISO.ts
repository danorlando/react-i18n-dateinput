import {getDateFormatFromLanguage} from './getDateFormatFromLanguage';

export function reformatStringDateToISO(dateString: string, language: string): string {
  let isoDate = '';
  const dateFormat = getDateFormatFromLanguage(language);

  if (dateFormat === 'MM/DD/YYYY') {
    const split = dateString.split('/');
    isoDate = `${split[2]}-${split[0]}-${split[1]}`;
  } else if (dateFormat === 'YYYY/MM/DD') {
    isoDate = dateString.replace(/\//g, '-');
  } else if (dateFormat === 'DD/MM/YYYY') {
    const split = dateString.split('/');
    isoDate = `${split[2]}-${split[1]}-${split[0]}`;
  }

  if (isoDate === '') {
    throw new Error(`Invalid date format: ${dateFormat}`);
  } else {
    return isoDate;
  }
}
