import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Appartment } from './appartment';
import { Client } from './client';
import { Files } from './file';
import { WarrantyStatus } from './warranty_status';

@Entity('warranties')
export class Warranty {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  clinet: Client;

  @ManyToOne(() => Files)
  @JoinColumn({ name: 'file_id' })
  file: Files;

  @ManyToOne(() => Appartment)
  @JoinColumn({ name: 'appartment_id' })
  appartment: Appartment;

  @ManyToOne(() => WarrantyStatus)
  @JoinColumn({ name: 'warranty_status_id' })
  warrantyStatus: WarrantyStatus;

  @Exclude()
  @CreateDateColumn({
    name: 'creation_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
