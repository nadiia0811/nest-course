import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { PosterEntity } from './entities/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, ActorEntity, PosterEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
