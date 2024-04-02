import { AccountType } from '@/types/AccountType';
import * as yup from 'yup';

export const AddAccountValidationSchema = yup.object().shape({
  accountType: yup.string().required(),
  username: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  serverAddress: yup.string().url(),
  serverPath: yup.string().matches(/^[a-zA-Z0-9/]*$/),

  serverPort: yup.lazy((value) =>
    value === ''
      ? yup
          .string()
          .test(
            'is-port',
            'Port must be between 1 and 65535',
            function (value: any) {
              const accountType = this.parent.accountType;

              if (accountType !== AccountType.ADVANCED) {
                return true;
              }
              return value >= 1 && value <= 65535;
            }
          )
      : yup
          .number()
          .test(
            'is-port',
            'Port must be between 1 and 65535',
            function (value: any) {
              const accountType = this.parent.accountType;

              if (accountType !== AccountType.ADVANCED) {
                return true;
              }
              return value >= 1 && value <= 65535;
            }
          )
  ),

  serverProtocol: yup.boolean(),
});

