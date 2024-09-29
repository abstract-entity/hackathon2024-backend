import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RagService } from './rag/rag.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly ragService: RagService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  converse(@Body() data: any): Observable<any> {
    if (data.rag) {
      return this.ragService.converse(data);
    } else {
      return this.appService.converse(data);
    }
  }
}
