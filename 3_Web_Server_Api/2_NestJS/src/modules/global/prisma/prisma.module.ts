import { Global, Module } from "@nestjs/common";
import { PrismaService } from './prisma.service';

// About global module: https://progressivecoder.com/how-to-use-global-modules-in-nestjs/
// Classes like helpers or utilities and database configuration classes are good as Global Modules

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }