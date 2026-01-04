import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) { }

  async findAllMovies(): Promise<MovieEntity[]> {
    const movies = await this.movieRepository.find({
      order: {
        createdAt: 'desc'
      }
    });
    return movies;
  }

  async createMovie(dto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);
    try {
      await this.movieRepository.save(movie);
      return movie;
    } catch (err) {
      throw new HttpException(
        'Failed to create movie',
        HttpStatus.INTERNAL_SERVER_ERROR, 
      );
    }
  }
}
