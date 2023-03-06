import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default User;
