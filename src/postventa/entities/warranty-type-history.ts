import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('warranty_type_history')
export class WarrantyTypeHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  oldStatus: string;

  @Column()
  newStatus: string;

  @CreateDateColumn({
    name: 'creation_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
