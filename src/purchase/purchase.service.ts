import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PurchaseService {
  db: PrismaService;
  constructor(db:PrismaService) {this.db=db};
  create(createPurchaseDto: CreatePurchaseDto) {
    return this.db.purchase.create({
      data: {
        total: createPurchaseDto.total,
        Product: createPurchaseDto.Product,
        Vendor: createPurchaseDto.Vendor,
        replicationammount: createPurchaseDto.replicationammount,
        replicationmetric: createPurchaseDto.replicationmetric,
        replicationstart: new Date(createPurchaseDto.replicationstart),
        replicationend: new Date(createPurchaseDto.replicationend),
        User: {
          connect: { id: createPurchaseDto.userid }
        },
        Bankaccount: {
          connect: { id: createPurchaseDto.bankaccountid }
        }
      }
    });
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  async remove(id: string) {
    const purchase = await this.db.user.findMany({
      where: { purchaseid: { has: id } },
    });
    await purchase.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          purchaseid: item.purchaseid.filter((id) => id !== id),
        },
      });
      this.db.purchase.delete({ where: { id: id } });
    });
  }
}
