import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  numberCard?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  securityCode?: string;

  @Column({ type: 'varchar', length: 4, unique: true, nullable: true })
  securityPin?: string;

  @ManyToMany(() => User, user => user.cards)
  users: User[];
}


