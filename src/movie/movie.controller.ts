import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Param, 
  Req,
  Patch,
  Delete
 } from '@nestjs/common';
import type { Request } from 'express';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  findAllMovies() {
    return this.movieService.findAllMovies();
  }  

  @Post('create')
  MovieDto(@Body() dto: MovieDto) {
    return this.movieService.createMovie(dto);
  }

  @Get(':id')
  getMovieById(@Param('id') id: string) {
    return this.movieService.getMovieById(+id);
  }

  @Patch(':id')
  updateMovieById(@Param('id') id: string, @Body() dto: Partial<MovieDto>) {
   return this.movieService.updateMovieById(+id, dto);
  }

  @Delete(':id')
  deleteMovieById(@Param('id') id: string) {
    return this.movieService.deleteMovieById(+id);
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
