import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusWarrantyType } from './status_warranty_type.entity';
import { Type } from './type.entity';
import { Warranty } from './warranty.entity';

@Entity('warranty_type')
export class WarrantyType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Warranty)
  @JoinColumn({ name: 'warranty_id' })
  warranty: Warranty;

  @ManyToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => StatusWarrantyType)
  @JoinColumn({ name: 'status_warranty_type_id' })
  statusWarrantyType: StatusWarrantyType;

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
