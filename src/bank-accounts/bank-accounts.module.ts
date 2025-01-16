import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService,PrismaService],
})
export class BankAccountsModule {}
