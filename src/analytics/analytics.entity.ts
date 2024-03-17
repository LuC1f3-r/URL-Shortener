import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlId: string;

  @Column()
  timestamp: Date;

  @Column()
  referrer: string;

  @Column()
  userAgent: string;

  @Column()
  browser: string;
  deviceType: any;

}
