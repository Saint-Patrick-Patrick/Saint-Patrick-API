import User from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'picture' })
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable:true })
  firstname: string;

  @OneToOne(() => User, (user) => user.picture)
  user: User;
}

export default Picture;
