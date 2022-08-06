import React from 'react';
import {render, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';
import DateInput from '../DateInput';

test('should not have any violations', async () => {
  const mockOnChange = jest.fn();
  let result;
  act(() => {
    result = render(
      <DateInput ariaLabel="Birth date" onChange={mockOnChange} />
    );
  });
  const results = await axe(result.container);
  expect(results).toHaveNoViolations();
});

test('should render the input with default aria label', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput onChange={mockOnChange} ariaLabel="Birth date" />
  );
  expect(getByRole('textbox', {name: /Birth date/i})).toBeTruthy();
});

test('should call onChange when input is made', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput onChange={mockOnChange} ariaLabel="Birth date" />
  );
  act(() => {
    userEvent.type(getByRole('textbox', {name: /Birth date/i}), '1');
  });
  expect(mockOnChange).toHaveBeenCalled();
});

test('should not allow invalid date to be entered', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput ariaLabel="Birth date" placeholder="mm/dd/yyyy" onChange={mockOnChange} />
  );
  const input = getByRole('textbox', {name: /Birth date/i});

  act(() => {
    userEvent.type(input, '12/34/3022');
  });
  //The 4 and the 3 is not allowed for second digit of month, resulting in a value of 12/30/22
  expect(input).toHaveValue('12/30/22');
});

test('compiling of pattern - should not allow a full m/d/y date if showYear is false', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput
      ariaLabel="Birth date"
      placeholder="mm/dd/yyyy"
      onChange={mockOnChange}
      showYear={false}
    />
  );
  const input = getByRole('textbox', {name: /Birth date/i});

  act(() => {
    userEvent.type(input, '01/01/2000');
  });

  expect(input).toHaveValue('01/01');
});

test('should display the correct pattern when language is spanish (DD/MM/YYYY)', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput ariaLabel="Birth date" onChange={mockOnChange} language="es" />
  );
  const input = getByRole('textbox', {name: /Birth date/i});

  act(() => {
    userEvent.type(input, '30122000');
  });

  expect(input).toHaveValue('30/12/2000');
});

test('should display the correct pattern when language is korean (YYYY/MM/DD)', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput ariaLabel="Birth date" onChange={mockOnChange} language="ko" />
  );
  const input = getByRole('textbox', {name: /Birth date/i});

  act(() => {
    userEvent.type(input, '20001230');
  });

  expect(input).toHaveValue('2000/12/30');
});

test('should display the correct pattern when language is korean and showDay is false', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput ariaLabel="Birth date" onChange={mockOnChange} language="ko" showDay={false} />
  );
  const input = getByRole('textbox', {name: /Birth date/i});

  act(() => {
    userEvent.type(input, '20001230');
  });

  expect(input).toHaveValue('2000/12');
});

test('should display the correct pattern when language is spanish and showDay is false', async () => {
  const mockOnChange = jest.fn();
  const {getByRole} = render(
    <DateInput ariaLabel="Birth date" onChange={mockOnChange} language="es" showDay={false} />
  );
  const input = getByRole('textbox', {name: /Birth date/i});

  act(() => {
    userEvent.type(input, '122000');
  });

  expect(input).toHaveValue('12/2000');
});
