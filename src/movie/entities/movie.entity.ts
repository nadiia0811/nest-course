import { 
    Entity, 
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated
 } from "typeorm";

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
    type: 'int',
    unsigned: true
  })
  releaseYear: number;

  @Column({
    type: 'decimal',
    precision: 3,
    nullable: true,
    scale: 1,
    default: 8.0
  })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  uptedAt: Date;
}