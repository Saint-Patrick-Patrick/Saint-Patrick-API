import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';

export enum Status {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  CANCELED = 'canceled',
}

@Entity({ name: 'SaintPatrickCard' })
export class SaintPatrickCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: true })
  card_number: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({type: 'numeric',nullable: true })
  PIN: number;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;

  @Column({type: 'numeric',nullable: true })
  pinPassword: number;

  @OneToOne(() => Wallet, { nullable: false })
  @JoinColumn()
  wallet: Wallet;
}

export default SaintPatrickCard;