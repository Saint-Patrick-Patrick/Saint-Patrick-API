import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';

enum Type {
  CVU = 'cvu',
  CBU = 'cbu',
  ALIAS = 'alias',
}

@Entity({ name: 'Transactions' })
export class Transactions {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar'})
  to: string;

  @Column({type:'enum', enum: Type})
  toType: Type;

  @Column({type:'varchar'})
  from: string;

  @Column({name: 'amountTransfer', type:'integer'})
  amount: number;

  @Column({type:'varchar', length:8 })
  date: string;

  @Column({type:'enum', enum: Type})
  fromType: Type;


  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;
}

export default Transactions;
