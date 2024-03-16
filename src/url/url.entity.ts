import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  createdDate: Date;

  @Column()
  expirationDate: Date;

  @Column()
  visitedCount: number;

  @Column()
  isExpired: boolean;

  @Column()
  isDeleted: boolean;

  @Column()
  isBlocked: boolean;

  @Column()
  isPrivate: boolean;

  @Column()
  isPublic: boolean;
}
