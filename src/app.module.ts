import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nest/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
// import config from './typeorm.config';

@Module({
  imports: [UrlModule, AuthModule, AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
