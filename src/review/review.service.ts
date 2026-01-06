import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from 'src/movie/movie.service';


@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService
  ) { }

  async createReview(dto: CreateReviewDto): Promise<ReviewEntity> {
    const movie = await this.movieService.getMovieById(dto.movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const { text, rating, movieId } = dto;
    const review = this.reviewRepository.create({ text, rating, movieId, movie });

    await this.reviewRepository.save(review);
    return review;
  }
}
