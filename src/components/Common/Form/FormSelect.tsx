import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  id: string;
  selectOptionField: string;
  options?: Object[];
  errors?: string;
  inputClassName?: string;
  formInputClassName?: string;
  labelClassName?: string;
  control: any;
  handleOptionsChange: (selectedOption: any) => void;

  [extra: string]: any;
};

const FormSelect = ({
  name,
  register,
  label,
  id,
  selectOptionField,
  errors,
  labelClassName,
  inputClassName,
  formInputClassName,
  control,
  options,
  handleOptionsChange,
  ...inputProps
}: Props) => {
  const errorMessages =
    errors?.split(',').map((error: string, index) => {
      return <li key={index}>{error}</li>;
    }) || [];

  const inputInvalid = errorMessages.length > 0 ? 'border-red-500' : '';

  if (errorMessages.length > 0) {
    // console.log('errorMessages', errorMessages);
  }

  // TODO: this is not fully working
  return (
    <div className={`${formInputClassName} flex mb-2 items-center`}>
      <label
        className={`${
          labelClassName ? labelClassName : 'inline-block w-32 text-right'
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <Controller
        name={'accountType'}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <select
            className={`${
              inputClassName
                ? inputClassName
                : 'text-black ml-2 border-2 border-slate-100 p-1'
            } ${inputInvalid} `}
            {...inputProps}
            // {...register('accountType')}
            onChange={(selectedOption: any) => {
              onChange(selectedOption[selectOptionField]);
              handleOptionsChange(selectedOption);
            }}
          >
            <option value='ADVANCED_ACCOUNT'>Advanced</option>
            <option value='MANUAL_ACCOUNT'>Manual</option>
            {/* {optionsList} */}
          </select>
        )}
      ></Controller>
    </div>
  );
};
export default React.memo(FormSelect);

