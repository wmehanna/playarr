import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { SettingsModule } from './settings/settings.module';
import { PrismaService } from '../prisma/prisma.service';
import { EmailSettingsDao } from './settings/email-settings.dao';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        SearchModule,
        SettingsModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, EmailSettingsDao],
})
export class AppModule implements OnModuleInit {
    constructor(private prisma: PrismaService) {}
    async onModuleInit() {
        await this.prisma.$connect();
    }
}
