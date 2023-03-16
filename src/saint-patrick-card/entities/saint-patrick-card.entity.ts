import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Status } from 'src/constants/contansts';
@Entity({ name: 'SaintPatrickCard' })
export class SaintPatrickCard {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'integer', unique:true })
    cardNumber: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;
  
    @Column({ type: 'varchar', length: 4, unique: true })
    securityPin?: string;

    @OneToOne(() => Wallet, (wallet) => wallet.saintPatrickCard)
    wallet: Wallet;

}

export default SaintPatrickCard;