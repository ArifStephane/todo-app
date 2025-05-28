import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import mikroOrmConfig from './config/mikro-orm.config'; // Adjust the import path as necessary
@Module({
  imports: [
    ConfigModule.forRoot(), // Configuration module should be imported here
    MikroOrmModule.forRoot(mikroOrmConfig), // MikroORM module should be imported here
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
