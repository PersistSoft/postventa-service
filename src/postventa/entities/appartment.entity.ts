import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Building, { nullable: true, eager: true })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @ManyToOne(() => AppartmentType, { nullable: true, eager: true })
  @JoinColumn({ name: 'appartment_type_id' })
  appartmentType: AppartmentType;

  @Column({ nullable: true })
  key: string;

  @Column({ name: 'qr_code', nullable: true })
  qrCode: string;

  @OneToMany(() => Parking, (parking) => parking.appartment, {
    eager: true,
    cascade: true,
  })
  parkings: Parking[];

  @OneToMany(() => UnitStorage, (unitStorage) => unitStorage.appartment, {
    eager: true,
    cascade: true,
  })
  unitStorages: UnitStorage[];

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

  @Column({ nullable: true, name: 'delivery_date' })
  deliveryDate: Date;
}
