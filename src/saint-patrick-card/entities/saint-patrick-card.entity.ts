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
  
    @Column({ type: 'numeric', nullable:true, unique:true })
    card_number: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    role: Status;
  
    @OneToOne(() => Wallet, (wallet) => wallet.saintPatrickCard)
    wallet: Wallet;
}



export default SaintPatrickCard 
