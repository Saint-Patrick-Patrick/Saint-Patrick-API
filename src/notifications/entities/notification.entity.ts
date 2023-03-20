import User from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'notification' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable:false })
  mensagge: string;


  @OneToOne(() => User)
  @JoinColumn()
  from: User;

  @OneToOne(() => User)
  @JoinColumn()
  to: User;

}

export default Notification;