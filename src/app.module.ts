import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HTTpModule } from './http.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    HTTpModule
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
