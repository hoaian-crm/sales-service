import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(() => Customer)
  // @JoinColumn()
  // customer: Customer;

  @Column()
  status: string;

  @Column()
  createAt: string;

  @Column()
  updateAt: string;
}
