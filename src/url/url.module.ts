import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
// import { TypeOrmModule } from '@nest/typeorm';
import { UrlController } from './url.controller';
// import { Url} from './url.entity';
@Injectable()
export class UrlService {
  private readonly characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private readonly base = this.characters.length;
  shortenUrl(longUrl: string, length: number = 0): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * this.base));
    }
    return result;
  }
}

@Module({
  // imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService],
  exports: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
