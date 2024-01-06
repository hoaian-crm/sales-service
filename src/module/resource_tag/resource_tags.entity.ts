import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sale } from '../sales/entity/sale.entity';

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

  @Column()
  resource_id: number;

  @ManyToOne(() => Sale, (s) => s.tags)
  @JoinColumn({
    name: 'resource_id',
  })
  sale: Sale;
}
