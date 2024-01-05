import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entiry';
import { Base } from './Base.entity';

@Entity('sales')
export class Sale extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer | number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product | number;

  @Column()
  amount: number;

  @Column()
  status: string;
}
