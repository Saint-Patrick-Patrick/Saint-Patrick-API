import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';


enum Status{
    ACTIVE="active"
   //definir estatus 
}

@Entity({ name: 'wallet' })
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable:true })
    cvu: string;
  
    @Column({ type: 'text', nullable:true })
    alias: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;
  
    @Column({ type: 'numeric', nullable:true })
    card_number: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    role: Status;

    @OneToOne(() => SaintPatrickCard, { cascade: true })
    @JoinColumn()
    saintPatrickCard: SaintPatrickCard;
  
  
    @OneToOne(() => User, (user) => user.wallet)
    user: User;
}
