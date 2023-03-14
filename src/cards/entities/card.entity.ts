import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Status } from 'src/constants/contansts';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, nullable: true, unique:true })
  cbu: string;

  @Column({type: 'varchar', unique:true})
  alias: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'numeric', nullable:true, unique:true })
  card_number: number;
  
  @Column({ type: 'varchar', nullable:true })
  Expiration_date: string;

  @Column({ type: 'varchar'})
  PIN:string;

  @Column({ type: 'varchar'})
  Property:string;

  @Column({ type: 'varchar'})
  PIN_password:string;
  
  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @ManyToOne(() => User, user => user.cards)
  user: User;
  
}