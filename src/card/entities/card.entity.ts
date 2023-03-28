import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Status } from 'src/constants/contansts';


@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  cardNumber: string;

  @Column({type:'varchar'})
  cardHolderName:string

  @Column({ type: 'integer' })
  cardVerificationCode: number;
 
  @Column({type: 'decimal', precision: 10, scale: 2})
  amount:number;

  @Column({type:'varchar',length:5})
  expirationDate:string;

  @Column({type:'varchar', length:12})
  ID: string;

  @Column({type:'varchar', length:12})
  cbu: string;

  @OneToMany(() => User, user => user.cards)
  @JoinColumn()
  user: User;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

}
