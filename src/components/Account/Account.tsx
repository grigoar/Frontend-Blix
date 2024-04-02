'use client';
import { AddAccountValidationSchema } from '@/validations/accounts/AddAccountValidation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '../Common/Card/Card';
import FormInput from '../Common/Form/FormInput';
import { AccountType } from '@/types/AccountType';
import { Controller } from 'react-hook-form';

const Account = () => {
  const [accountType, setAccountType] = React.useState<AccountType>(
    AccountType.ADVANCED
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    mode: 'onTouched',
  });

  const saveAccount = async (data: any) => {
    console.log({ data });
    await fetch('http://localhost:3000/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const onSubmitHandler = (data: any) => {
    console.log({ data });
    saveAccount(data);

    // TODO: enable reset after form submission
    // reset();
  };

  const changeAccountType = (e: any) => {
    console.log(e);
    setAccountType(e.target.value);
  };

  const isAdvancedAccount = accountType === AccountType.ADVANCED;

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className='text-center text-lg'>Lets save a new account!</h2>
        <br />

        <Controller
          name={'accountType'}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <div className={` flex mb-2 items-center`}>
              <label
                className='inline-block w-32 text-right'
                htmlFor={accountType}
              >
                Account Type:
              </label>
              <select
                {...register('accountType')}
                onChange={(selectedOption: any) => {
                  onChange(selectedOption[accountType]);
                  changeAccountType(selectedOption);
                }}
                className='text-black ml-2 border-2 border-slate-100 p-1'
              >
                <option value={`${AccountType.ADVANCED}`}>Advanced</option>
                <option value={`${AccountType.MANUAL}`}>Manual</option>
              </select>
            </div>
          )}
          rules={{ required: true }}
        />

        <FormInput
          register={register}
          placeholder='name@example.com'
          type='email'
          name='username'
          id='username'
          label='User Name:'
          errors={errors.username?.message}
        />

        <FormInput
          register={register}
          placeholder='password'
          type='password'
          name='password'
          id='password'
          label='Password:'
          errors={errors.password?.message}
        />

        <FormInput
          register={register}
          placeholder='http://example.com'
          type='url'
          name='serverAddress'
          id='serverAddress'
          label='Server Address:'
          errors={errors.serverAddress?.message}
        />

        {isAdvancedAccount && (
          <FormInput
            register={register}
            placeholder='/calendars/user/'
            type='text'
            name='serverPath'
            id='serverPath'
            label='Server Path:'
            errors={errors.serverPath?.message}
          />
        )}

        {isAdvancedAccount && (
          <div className='flex'>
            <FormInput
              register={register}
              placeholder='port'
              type='number'
              name='serverPort'
              id='serverPort'
              label='Server Port:'
              errors={errors.serverPort?.message}
              inputClassName='w-16 ml-2 border-2 border-slate-100 p-1'
            />

            <FormInput
              register={register}
              placeholder='protocol'
              type='checkbox'
              name='serverProtocol'
              id='serverProtocol'
              label='Use SSL'
              labelClassName='flex items-center justify-center '
              inputClassName='accent-red-500  w-6  mr-2'
              formInputClassName='flex flex-row-reverse justify-center w-full'
              errors={errors.serverProtocol?.message}
            />
          </div>
        )}

        <div className='flex items-center w-full justify-center mt-4'>
          <button
            className='border-2 border-blue-400 rounded-lg p-2 hover:bg-blue-400 hover:text-white'
            type='submit'
          >
            Save Account
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Account;

