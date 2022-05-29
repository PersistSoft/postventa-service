import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppartmentType } from './appartment_type.entity';
import { Building } from './building.entity';
import { Parking } from './parking.entity';
import { UnitStorage } from './unit_storage.entity';

@Entity('appartments')
export class Appartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 280 })
  code: string;

  @Column({ name: 'sales_name' })
  salesName: string;

  @Column({ name: 'definitive_name' })
  definitiveName: string;

  @ManyToOne(() => Building)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @ManyToOne(() => Parking)
  @JoinColumn({ name: 'parking_id' })
  parking: Building;

  @ManyToOne(() => UnitStorage)
  @JoinColumn({ name: 'unit_storage_id' })
  unitStorage: UnitStorage;

  @ManyToOne(() => AppartmentType)
  @JoinColumn({ name: 'appartment_type_id' })
  typeAppartmentId: AppartmentType;

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
