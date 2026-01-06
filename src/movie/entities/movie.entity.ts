import { ActorEntity } from "src/actor/entities/actor.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { 
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";

export enum Genre {
  ACTION = 'action',
  FANTASY = 'fantasy',
  HORROR = 'horror',
  DRAMA = 'drama'
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar'
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @Column({
    name: 'release_year',
    type: 'int',
    unsigned: true
  })
  releaseYear: number;

  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.DRAMA
  })
  genre: Genre;

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({ //промежуточная таблица для связи many - to - many
    name: 'movie_actors',
    joinColumn: {  //колонка для сущности movie в промежуточной таблице
      name: 'movie_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: { //колонка для сущности actor в промежуточной таблице
      name: 'actor_id',
      referencedColumnName: 'id'
    }
  })
  actors: ActorEntity[];

  @Column({
    type: 'decimal',
    precision: 3,
    nullable: true,
    scale: 1,
    default: 8.0
  })
  rating: number;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[]

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  uptedAt: Date;
}