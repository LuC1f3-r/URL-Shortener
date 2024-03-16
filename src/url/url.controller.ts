import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { Analytics } from 'src/analytics/analytics.entity';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post('shorten')
  async shortenUrl(@Body('longUrl') longUrl: string): Promise<string> {
    return this.urlService.shortenUrl(longUrl);
  }

  @Get(':shortUrl')
  async expandUrl(@Param('shortUrl') shortUrl: string): Promise<string | null> {
    return this.urlService.expandUrl(shortUrl);
  }

  @Delete(':shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string): Promise<boolean> {
    return this.urlService.deleteUrl(shortUrl);
  }

  @Post('analytics')
  async saveAnalyticsData(@Body() data: any): Promise<Analytics> {
    return this.analyticsService.saveAnalyticsData(data);
  }

  @Get('analytics/url/:urlId')
  async getAnalyticsByUrl(@Param('urlId') urlId: string): Promise<Analytics[]> {
    return this.analyticsService.findAnalyticsByUrl(urlId);
  }

  @Get('analytics/referrer/:referrer')
  async getAnalyticsByReferrer(
    @Param('referrer') referrer: string,
  ): Promise<Analytics[]> {
    return this.analyticsService.findAnalyticsByReferrer(referrer);
  }

  @Get('analytics/user-agent/:userAgent')
  async getAnalyticsByUserAgent(
    @Param('userAgent') userAgent: string,
  ): Promise<Analytics[]> {
    return this.analyticsService.findAnalyticsByUserAgent(userAgent);
  }

  @Get('analytics/clicks/:urlId')
  async countClicksByUrl(@Param('urlId') urlId: number): Promise<number> {
    return this.analyticsService.countClicksByUrl(urlId);
  }
}
