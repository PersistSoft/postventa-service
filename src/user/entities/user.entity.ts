import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  created_at: Date;

  updated_at: Date;
}
