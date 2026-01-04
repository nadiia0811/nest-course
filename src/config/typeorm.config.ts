import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export function getTypeormConfig(configService: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: configService.get('POSTGRES_USER'),
    database: configService.get('POSTGRES_DB'),
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    password: configService.get('POSTGRES_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true
  }
}