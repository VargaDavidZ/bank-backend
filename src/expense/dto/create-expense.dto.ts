import { BankAccount, User } from '@prisma/client';

export class CreateExpenseDto {
  total: number;
  Category: string;
  Description: string;
  userid: string;
  bankaccountid: string;
  replicationammount: number;
  replicationmetric: string;
  replicationstart: Date;
  replicationend: Date;
}
