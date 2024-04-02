import { AccountType } from './AccountType';

export type Account = {
  accountType: AccountType;
  username: string;
  password: string;
  serverAddress: string;
  serverPath: string;
  serverPort: string;
  serverProtocol: boolean;
};

