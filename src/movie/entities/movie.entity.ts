import { 
    Entity, 
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated
} from "typeorm";

export enum Genre {
  ACTION = 'action',
  FANTASY = 'fantasy',
  HORROR = 'horror',
  DRAMA = 'drama'
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryColumn()
  @Generated('uuid')
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

  @Column({
    type: 'decimal',
    precision: 3,
    nullable: true,
    scale: 1,
    default: 8.0
  })
  rating: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  uptedAt: Date;
}