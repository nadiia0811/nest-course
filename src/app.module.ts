import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeormConfig } from './config/typeorm.config';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: getTypeormConfig,      
    }),
    TaskModule, 
    MovieModule, ReviewModule, ActorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
