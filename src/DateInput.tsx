import React, {useState, useEffect} from 'react';
import {IMaskInput, IMask} from 'react-imask';
import {useStrings} from 'ux-cms';
import {getDateFormatFromLanguage} from './utilities';

type TDateInputProps = {
  onChange: (value: string) => void;
  language?: string;
  ariaLabel?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
  ariaInvalid?: boolean;
  showDay?: boolean;
  showYear?: boolean;
};

function DateInput({
  onChange,
  language = 'en',
  ariaLabel,
  className,
  placeholder,
  name,
  id,
  showDay = true,
  showYear = true,
  defaultValue,
  disabled = false,
  ariaInvalid = false,
}: TDateInputProps) {
  const [dateValue, setDateValue] = useState<string>(defaultValue?.toString() || '');
  const [maskPattern, setMaskPattern] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [defaultPlaceholder, setDefaultPlaceholder] = useState<string>('');

  const strings = useStrings();

  const handleAccept = (value: string) => {
    setDateValue(value);
    onChange(value);
  };

  const blocks = {
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
    },
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    Y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2999,
    },
  };

  useEffect(() => {
    const dateFormat = getDateFormatFromLanguage(language);
    setFormat(dateFormat);
  }, [language]);

  useEffect(() => {
    if (format) {
      let pattern = '';
      switch (format) {
        case 'MM/DD/YYYY':
          pattern = 'm';
          if (showDay) pattern += '{/}`d';
          if (showYear) pattern += '{/}`Y';
          setMaskPattern(pattern);
          setDefaultPlaceholder(strings.FormInput_Date_MMDDYYYY);
          break;
        case 'DD/MM/YYYY':
          if (showDay) {
            pattern = 'd';
            pattern += '{/}`m';
            if (showYear) pattern += '{/}`Y';
          } else {
            pattern = 'm';
            pattern += '{/}`Y';
          }
          setMaskPattern(pattern);
          setDefaultPlaceholder(strings.FormInput_Date_DDMMYYYY);
          break;
        case 'YYYY/MM/DD':
          if (showYear) {
            pattern = 'Y';
            pattern += '{/}`m';
            if (showDay) pattern += '{/}`d';
          } else {
            pattern = 'm';
            pattern += '{/}`d';
          }
          setMaskPattern(pattern);
          setDefaultPlaceholder(strings.FormInput_Date_YYYYMMDD);
          break;
        default:
          pattern = 'm';
          if (showDay) pattern += '{/}`d';
          if (showYear) pattern += '{/}`Y';
          setMaskPattern(pattern);
          setDefaultPlaceholder(strings.FormInput_Date_MMDDYYYY);
          break;
      }
    }
  }, [
    showDay,
    showYear,
    format,
    strings.FormInput_Date_DDMMYYYY,
    strings.FormInput_Date_MMDDYYYY,
    strings.FormInput_Date_YYYYMMDD,
  ]);

  return (
    <IMaskInput
      id={id}
      mask={maskPattern}
      disabled={disabled}
      blocks={blocks}
      name={name}
      aria-label={ariaLabel}
      aria-invalid={ariaInvalid}
      placeholder={placeholder ? placeholder : defaultPlaceholder}
      className={className}
      // @ts-ignore value is typed as unknown in IMaskInput, should be string
      onAccept={handleAccept}
      value={dateValue}
    />
  );
}

export default DateInput;
