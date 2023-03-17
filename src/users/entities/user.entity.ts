import { Card } from 'src/card/entities/card.entity';
import Picture from 'src/picture/entities/picture.entity';
import Transactions from 'src/transactions/entities/transactions.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Status } from 'src/constants/contansts';

@Entity({ name: 'user' })
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

  @ManyToMany(() => Card, card => card.users)
  @JoinColumn()
  cards: Card[];

  @OneToOne(() => Picture, { cascade: true })
  @JoinColumn()
  picture: Picture;

  @OneToOne(() => Wallet, { cascade: true })
  @JoinColumn()
  wallet: Wallet;


  @OneToMany(()=> Transactions, (transactions)=> transactions)
  transactions: Transactions[];

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

}

export default User;
