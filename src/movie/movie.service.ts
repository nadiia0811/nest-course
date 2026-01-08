import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>
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
    const { title, releaseYear, actorIds } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds)
      }
    }); 

    if (!actors || !actors.length) throw new NotFoundException("One or more actors not found");

    const movie = this.movieRepository.create({ title, releaseYear, actors });
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

  async getMovieById(id: string): Promise<MovieEntity> {
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

  async updateMovieById(id: string, dto: Partial<MovieDto>) {
    const movie = await this.getMovieById(id); 

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    
    Object.assign(movie, dto);
    return await this.movieRepository.save(movie);
  }

  async deleteMovieById(id: string) {
    const movie = await this.getMovieById(id);

    await this.movieRepository.remove(movie);
    return movie.id;
  }
}
