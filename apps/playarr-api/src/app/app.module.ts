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
        MailerModule.forRootAsync({
            useFactory: async (dao: EmailSettingsDao) => {
                const cfg = await dao.get();
                if (!cfg) throw new Error('Email settings not found');
                const transport =
                    cfg.provider === 'smtp'
                        ? {
                            host: cfg.smtpHost,
                            port: cfg.smtpPort,
                            secure: cfg.smtpSecure,
                            auth: { user: cfg.smtpUser, pass: cfg.smtpPass },
                        }
                        : {
                            host: 'smtp.sendgrid.net',
                            auth: { user: 'apikey', pass: cfg.apiKey },
                        };
                return { transport, defaults: { from: cfg.fromAddress } };
            },
            inject: [EmailSettingsDao],
        }),
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
