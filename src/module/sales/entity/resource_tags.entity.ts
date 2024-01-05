import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from './sale.entity';

@Entity('resource_tags')
export class ResourceTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  resource: string;

  @OneToOne(() => Sale)
  resource_id: number;
}
