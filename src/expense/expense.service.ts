import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpenseService {
  db:PrismaService
  constructor(db:PrismaService){
    this.db=db
  }
  create(createExpenseDto: CreateExpenseDto) {
    return this.db.expense.create({
      data: {
        total: createExpenseDto.total,
        Category: createExpenseDto.Category,
        Description: createExpenseDto.Description,
        replicationammount: createExpenseDto.replicationammount,
        replicationmetric: createExpenseDto.replicationmetric,
        replicationstart: new Date(createExpenseDto.replicationstart),
        replicationend: new Date(createExpenseDto.replicationend),
        User: {
          connect: { id: createExpenseDto.userid }
        },
        Bankaccount: {
          connect: { id: createExpenseDto.bankaccountid }
        }
      }
    });
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async remove(id: string) {
    const expense = await this.db.user.findMany({
      where: { expenseid: { has: id } },
    });
    await expense.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          expenseid: item.expenseid.filter((id) => id !== id),
        },
      });
      this.db.expense.delete({ where: { id: id } });
    });
  }
}
