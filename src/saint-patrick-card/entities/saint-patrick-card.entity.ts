import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';


enum Status{
    ACTIVE="active"
   //definir estatus 
}

@Entity({ name: 'SaintPatrickCard' })
export class SaintPatrickCard {
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
  
  
    @OneToOne(() => Wallet, (wallet) => wallet.saintPatrickCard)
    wallet: Wallet;
}



export default SaintPatrickCard 
