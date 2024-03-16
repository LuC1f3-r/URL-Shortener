import { EntityRepository, Repository } from 'typeorm';
import { Analytics } from './analytics.entity';

@EntityRepository(Analytics)
export class AnalyticsRepository extends Repository<Analytics> {}