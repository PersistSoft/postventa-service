import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Files } from './file.entity';
import { WarrantyType } from './warranty_type.entity';

@Entity('warranty_type_file')
export class WarrantyTypeFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WarrantyType)
  @JoinColumn({ name: 'warranty_type_id' })
  warrantyType: WarrantyType;

  @ManyToOne(() => Files)
  @JoinColumn({ name: 'file_id' })
  file: Files;
}
