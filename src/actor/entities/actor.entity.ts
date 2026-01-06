import { MovieEntity } from "src/movie/entities/movie.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from "typeorm";


@Entity({ name: 'actors' })
export class ActorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar'})
    name: string;

    @ManyToMany(() => MovieEntity, (movie) => movie.actors)
    movies: MovieEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}