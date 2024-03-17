import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytics } from './analytics.entity';
import { AnalyticsRepository } from './analytics.repository';
import { Between } from 'typeorm';
import * as UAParser from 'ua-parser-js';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsRepository)
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  async saveAnalyticsData(data: Analytics): Promise<Analytics> {
    // Parse user-agent string
    const parser = new UAParser();
    const userAgent = parser.setUA(data.userAgent).getResult();

    // Extract browser and device information
    const browser = (data as Analytics).browser;
    const deviceType = userAgent.device.type;

    // Add browser and device information to analytics data
    data.browser = browser;
    data.deviceType = deviceType;

    const analytics = this.analyticsRepository.create(data);
    return this.analyticsRepository.save(analytics);
  }

  async findAnalyticsByUrl(urlId: string): Promise<Analytics[]> {
    return this.analyticsRepository.find({ where: { urlId } });
  }

  async findAnalyticsByTimestampRange(
    start: Date,
    end: Date,
  ): Promise<Analytics[]> {
    return this.analyticsRepository.find({
      where: { timestamp: Between(start, end) },
    });
  }

  async findAnalyticsByReferrer(referrer: string): Promise<Analytics[]> {
    return this.analyticsRepository.find({ where: { referrer } });
  }

  async findAnalyticsByUserAgent(userAgent: string): Promise<Analytics[]> {
    return this.analyticsRepository.find({ where: { userAgent } });
  }

  async countClicksByUrl(urlId: number): Promise<number> {
    return this.analyticsRepository.count({ where: { urlId: String(urlId) } });
  }

  async deleteAnalyticsById(id: number): Promise<boolean> {
    const analytics = await this.analyticsRepository.findOne({ where: { id } });
    if (analytics) {
      await this.analyticsRepository.remove(analytics);
      return true;
    }
    return false;
  }
}
