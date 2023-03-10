import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar'})
  fromCBU: string;

  @Column({type:'varchar'})
  for: string;

  @Column({type:'varchar', nullable:true})
  toCVUOrAlias: string;

  @Column({type:'integer', nullable:true})
  toCardCBU:number;

  @Column({type:'integer'})
  amount: number;

  @Column({type:'varchar', length:8 })
  date: string;

  @Column({type:'varchar', length:8 })
  hour: string;

  @ManyToOne(() => User, (user) => user)
  user: User
}

export default Transaction;