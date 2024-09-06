import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { imports } from './graphql/imports';
import { envs } from './config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: true,      
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (ConfigService:ConfigService) => ({
        
        type: 'mysql',
        host: '127.0.0.1',
        port: ConfigService.get('PORTDB'),
        database:ConfigService.get('B_DATABASE'),
        username:ConfigService.get('DB_USERNAME'),
        password:ConfigService.get('DB_PASSWORD'),
        entities:[],
        synchronize:true,

      })
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (ConfigService:ConfigService) => ({
        
        type: 'mssql',
        host: '127.0.0.1',
        port: ConfigService.get('PORT2'),
        database:ConfigService.get('B_DATABASE2'),
        username:ConfigService.get('DB_USERNAME2'),
        password:ConfigService.get('DB_PASSWORD2'),
        entities:[],
        synchronize:true,
        options: { encrypt: false },

      })
    }),


    MongooseModule.forRoot('mongodb://127.0.0.1/app'),

    imports,   

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
