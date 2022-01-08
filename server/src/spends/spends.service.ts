import { Injectable } from '@nestjs/common';
import { CreateSpendInput } from './dto/create-spend.input';
import { UpdateSpendInput } from './dto/update-spend.input';

@Injectable()
export class SpendsService {
  create(createSpendInput: CreateSpendInput) {
    return 'This action adds a new spend';
  }

  findAll() {
    return `This action returns all spends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spend`;
  }

  update(id: number, updateSpendInput: UpdateSpendInput) {
    return `This action updates a #${id} spend`;
  }

  remove(id: number) {
    return `This action removes a #${id} spend`;
  }
}
