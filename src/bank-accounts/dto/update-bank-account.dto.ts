import { PartialType } from '@nestjs/mapped-types';
import { CreateBankAccountDto } from './create-bank-account.dto';
import { Expense, Purchase, User } from '@prisma/client';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {
    expenseid:string;
    purchaseid:string;
}
