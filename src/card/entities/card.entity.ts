import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Status } from 'src/constants/contansts';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer'})
  cardNumber: number;

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

  @Column({ type: 'varchar', length: 4 })
  securityPin?: string;

  @ManyToMany(() => User, user => user.cards)
  users: User[];

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;
}


