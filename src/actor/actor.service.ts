import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActorEntity } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
    constructor(
      @InjectRepository(ActorEntity)
      private readonly actorRepository: Repository<ActorEntity>,
    ) {}

    async createActor(dto: CreateActorDto): Promise<ActorEntity> {
        const actor = this.actorRepository.create(dto);

        return await this.actorRepository.save(actor);
    }
}
