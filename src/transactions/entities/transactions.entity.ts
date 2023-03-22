import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity({ name: 'Transactions' })
export class Transactions {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar'})
  to: string;

  @Column({type:'varchar'})
  from: string;

  @Column({name: 'amountTransfer', type:'integer'})
  amount: number;

  @Column({type:'varchar', length:8 })
  date: string;

  @Column({type:'varchar', length:8 })
  hour: string;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;
}

export default Transactions;
