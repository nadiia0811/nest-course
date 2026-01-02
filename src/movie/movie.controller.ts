import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  findAll(@Query() query: any) {
    return JSON.stringify(query);
  }  

  @Post()
  createMovie(@Body() body: { title: string }) {
    const { title } = body;
    return `Film "${title}" created`;
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
