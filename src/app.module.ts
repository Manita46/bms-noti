import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InternalEventsModule } from './internal-events/internal-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InternalEventsModule,
  ],
})
export class AppModule { }
