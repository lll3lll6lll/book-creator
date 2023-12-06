import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {UsersModule} from "@src/users/users.module";
import {UsersService} from "@src/users/services/users.service";

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
      TypeOrmModule.forRootAsync({
          imports: [ ConfigModule ],
          inject: [ ConfigService ],
          useFactory: async (config: ConfigService) => ({
              type: 'postgres',
              host: config.get<string>('DATABASE_HOST'),
              username: config.get<string>('DATABASE_USERNAME'),
              password: config.get<string>('DATABASE_PASSWORD'),
              database: config.get<string>('DATABASE_NAME'),
              port: config.get<number>('DATABASE_PORT'),
              entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
              synchronize: true,
              autoLoadEntities: true,
              logging: true,
          }),
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          autoSchemaFile: 'schema.gql',
          sortSchema: true,
          playground: true,
          driver: ApolloDriver,
      }),
      UsersModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
