import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { BankAccount, Expense, Purchase, UserType } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  expenseid?:string;
  purchesid?:string;
  bankaccountid?:string;
  Role?: UserType;
}
