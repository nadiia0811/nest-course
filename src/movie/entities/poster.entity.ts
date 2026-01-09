import { 
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
} from "typeorm";
import { MovieEntity } from "./movie.entity";


@Entity({ name: 'movie_posters' })
export class PosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
    length: 255
  })
  url: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity;
}