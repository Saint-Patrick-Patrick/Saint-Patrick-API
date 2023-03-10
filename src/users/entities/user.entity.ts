import { Card } from 'src/card/entities/card.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable:true })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable:true })
  lastname: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable:true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable:true })
  password: string;

  @OneToMany(() => Card, card => card.user)
  cards: Card[];
}

export default User;
