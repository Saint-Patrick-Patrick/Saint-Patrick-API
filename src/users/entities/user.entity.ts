import { Card } from 'src/cards/entities/card.entity';
import Picture from 'src/picture/entities/picture.entity';
import Transactions from 'src/transactions/entities/transactions.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable:true })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable:true })
  lastname: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable:true })
  email: string;

  @Column({ type: 'varchar', nullable:true })
  password: string;

  @OneToMany(() => Card, card => card.user)
  cards: Card[];

  
  @OneToOne(() => Picture, { cascade: true })
  @JoinColumn()
  picture: Picture;

  @OneToOne(() => Wallet, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(()=> Transactions, (transactions)=> transactions)
  transactions: Transactions
}

export default User;
