import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RagService } from './rag/rag.service';

ConfigModule.forRoot();

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RagService],
})
export class AppModule {}
