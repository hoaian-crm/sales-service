import { ResourceTags } from 'src/module/resource_tag/resource_tags.entity';
import {
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ResourceTags, (tag) => tag.sale, { eager: true })
  tags: ResourceTags[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
