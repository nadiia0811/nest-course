import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';

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

  async createMovie(dto: MovieDto): Promise<MovieEntity> {
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

  async getMovieById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id
      }
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async updateMovieById(id: number, dto: Partial<MovieDto>) {
    const movie = await this.getMovieById(id); 

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    
    Object.assign(movie, dto);
    return await this.movieRepository.save(movie);
  }

  async deleteMovieById(id: number) {
    const movie = await this.getMovieById(id);

    await this.movieRepository.remove(movie);
    return movie.id;
  }
}
