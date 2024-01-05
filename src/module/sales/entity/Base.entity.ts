import {
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResourceTags } from './resource_tags.entity';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ResourceTags, (r_tag) => r_tag.id)
  tags: ResourceTags[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
