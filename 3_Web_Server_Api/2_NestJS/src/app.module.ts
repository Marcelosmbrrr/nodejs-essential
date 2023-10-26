import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // https://docs.nestjs.com/techniques/configuration
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/global/prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule, ConfigModule.forRoot()], // Import modules - native and custom
  controllers: [], // Import controllers
  providers: [], // Import module dependencies, like services
})
export class AppModule { }
