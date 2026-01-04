import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity) 
        private readonly movieRepository: Repository<MovieEntity>
    ) {}

    async findAllMovies(): Promise<MovieEntity[]> {
      const movies = await this.movieRepository.find();
      return movies;
    }
}
