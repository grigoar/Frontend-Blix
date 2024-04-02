import React from 'react';

type Props = {
  name: string;
  label: string;
  id: string;
  errors?: string;
  inputClassName?: string;
  formInputClassName?: string;
  labelClassName?: string;

  [extra: string]: any;
};

const FormInput = ({
  name,
  register,
  label,
  id,
  errors,
  labelClassName,
  inputClassName,
  formInputClassName,
  ...inputProps
}: Props) => {
  const errorMessages =
    errors?.split(',').map((error: string, index) => {
      return <li key={index}>{error}</li>;
    }) || [];

  const inputInvalid = errorMessages.length > 0 ? 'border-red-500' : '';

  if (errorMessages.length > 0) {
    console.log('errorMessages', errorMessages);
  }

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
      <input
        {...register(name)}
        id={id}
        name={name}
        className={`${
          inputClassName
            ? inputClassName
            : 'text-black ml-2 border-2 border-slate-100 p-1'
        } ${inputInvalid} `}
        {...inputProps}
      />
    </div>
  );
};
export default React.memo(FormInput);

