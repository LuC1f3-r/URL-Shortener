import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlRepository)
    private readonly urlRepository: UrlRepository,
  ) {}

  async shortenUrl(longUrl: string): Promise<string> {
    const shortId = this.generateShortId();
    const url = new Url();
    url.longUrl = longUrl;
    url.shortUrl = shortId;
    await this.urlRepository.save(url);
    return shortId;
  }

  async expandUrl(shortUrl: string): Promise<string | null> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    return url ? url.longUrl : null;
  }

  async deleteUrl(shortUrl: string): Promise<boolean> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    if (url) {
      await this.urlRepository.remove(url);
      return true;
    }
    return false;
  }

  private generateShortId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const base = characters.length;
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * base));
    }
    return result;
  }
}
