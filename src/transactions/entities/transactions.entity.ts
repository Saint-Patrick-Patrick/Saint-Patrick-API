import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar', nullable:true})
  fromCBU: string;

  @Column({type:'varchar', nullable:true})
  for: string;

  @Column({type:'varchar'})
  toCVUOrAlias: string;

  @Column({type:'int'})
  toCardCBU:number;

  @Column({type:'int', nullable:true})
  amount: number;

  @Column({type:'varchar', nullable:true, length:8 })
  date: string;

  @Column({type:'varchar', nullable:true, length:8 })
  hour: string;

  @OneToMany(() => User, (user) => user)
  user: User
}

export default Transactions;
