import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { SaintPatrickCard } from '../../saint-patrick-card/entities/saint-patrick-card.entity';
import { User } from '../../user/entities/user.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Status } from 'src/constants/contansts';

@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, unique: true })
  cvu: string;

  @Column({ type: 'text', nullable: true, unique: true })
  alias: string;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @OneToOne(() => SaintPatrickCard, { cascade: true })
  @JoinColumn()
  saintPatrickCard: SaintPatrickCard;

  @OneToOne(() => User, (user) => user.wallet, { eager: true })
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.wallet)
  transaction: Transaction[];
}

export default Wallet;
