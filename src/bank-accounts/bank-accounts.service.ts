import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BankAccountsService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createBankAccountDto: CreateBankAccountDto) {
    return this.db.bankAccount.create({
      data: {
        Users: {
          connect: { id: createBankAccountDto.userid },
        },
        Expense: undefined,
        Purchase: undefined,
      },
    });
  }

  findAllbyUserId(id: string) {
    return this.db.bankAccount.findMany({
      include: { Users: true },
      where: { userId: { has: id } },
    });
  }

  findOne(id: string) {
    return this.db.bankAccount.findUnique({ where: { id: id } });
  }

  async updateuser(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.db.user.update({
      where: { id: updateBankAccountDto.userid },
      data: {
        Accounts: {
          connect: { id: id },
        },
      },
    });
    return this.db.bankAccount.update({
      where: { id: id },
      data: {
        Users: {
          connect: { id: updateBankAccountDto.userid },
        },
      },
    });
  }

  async remove(id: string) {
    const userwithbankaccount = await this.db.user.findMany({
      where: { BankaccountsId: { has: id } },
    });
    await userwithbankaccount.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          BankaccountsId: item.BankaccountsId.filter((bankid) => bankid !== id),
        },
      });
    });

    return await this.db.bankAccount.delete({ where: { id: id } });
  }
}
