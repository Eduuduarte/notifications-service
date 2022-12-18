import { Module } from '@nestjs/common';
import { HTTpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    HTTpModule,
    DatabaseModule
  ],
})
export class AppModule {}
