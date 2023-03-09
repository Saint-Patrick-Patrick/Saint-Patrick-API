import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 19, nullable: true })
  numberCard?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  securityCode?: string;

  @Column({ type: 'varchar', length: 4, unique: true, nullable: true })
  securityPin?: string;
}
