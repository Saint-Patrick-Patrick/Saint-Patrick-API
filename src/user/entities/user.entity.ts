import { Card } from 'src/card/entities/card.entity';
import Picture from 'src/picture/entities/picture.entity';
import Transaction from 'src/transaction/entities/transaction.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Status } from 'src/core/constants/contansts';
import Notification from 'src/notification/entities/notification.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @ManyToMany(() => Card, card => card.user)
  @JoinColumn()
  cards: Card[];

  @OneToOne(() => Picture, { cascade: true })
  @JoinColumn()
  picture: Picture;

  @OneToOne(() => Wallet, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(() => Transaction, (transaction) => transaction)
  transactions: Transaction[];

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @OneToMany(() => Notification, (notification) => notification.to)
  @JoinColumn()
  notificationsReceived: Notification[];

  @OneToMany(() => Notification, (notification) => notification.from)
  @JoinColumn()
  notificationsSent: Notification[];
}

export default User;
