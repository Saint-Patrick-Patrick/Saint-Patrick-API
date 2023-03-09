import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  numberCard?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  securityCode?: string;

  @Column({ type: 'varchar', length: 4, unique: true, nullable: true })
  securityPin?: string;

  @ManyToOne(() => User, user => user.cards)
  user: User;
  
}


