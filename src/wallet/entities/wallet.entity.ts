import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import User from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Status } from 'src/constants/contansts';

@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, unique: true })
  cvu: string;

  @Column({ type: 'text', nullable: true, unique: true })
  alias: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @OneToOne(() => SaintPatrickCard, { cascade: true })
  @JoinColumn()
  saintPatrickCard: SaintPatrickCard;

  @OneToOne(() => User, (user) => user.wallet)
  user: User;
}
