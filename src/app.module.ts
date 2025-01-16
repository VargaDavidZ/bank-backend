import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ExpenseModule } from './expense/expense.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, PurchaseModule, ExpenseModule, BankAccountsModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
