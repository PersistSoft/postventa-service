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

  @Column({ name: 'construction_name', length: 50 })
  constructionName: string;

  @Column({ name: 'sales_name', nullable: true })
  salesName: string;

  @Column({ name: 'definitive_name', nullable: true })
  definitiveName: string;

  @ManyToOne(() => Building, { nullable: true })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @ManyToOne(() => Parking, { nullable: true })
  @JoinColumn({ name: 'parking_id' })
  parking: Parking;

  @ManyToOne(() => UnitStorage, { nullable: true })
  @JoinColumn({ name: 'unit_storage_id' })
  unitStorage: UnitStorage;

  @ManyToOne(() => AppartmentType, { nullable: true })
  @JoinColumn({ name: 'appartment_type_id' })
  appartmentType: AppartmentType;

  @Column({ nullable: true })
  key: string;

  @Column({ name: 'qr_code', nullable: true })
  qrCode: string;

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
