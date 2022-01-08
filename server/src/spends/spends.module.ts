import { Module } from '@nestjs/common';
import { SpendsService } from './spends.service';
import { SpendsResolver } from './spends.resolver';

@Module({
  providers: [SpendsResolver, SpendsService]
})
export class SpendsModule {}
