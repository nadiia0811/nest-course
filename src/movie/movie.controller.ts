import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  findAllMovies() {
    return this.movieService.findAllMovies();
  }  

  @Post('create')
  createMovie(@Body() dto: CreateMovieDto) {
    return this.movieService.createMovie(dto);
  }

  @Get('request')
  getRequest(@Req() req: Request) {
    return {
      method: req.method,
      headers: req.headers,
      url: req.url,
      query: req.query,
      params: req.params
    };
  }
}
