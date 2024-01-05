import { ResourceTags } from 'src/module/resource_tag/resource_tags.entity';
import {
  CreateDateColumn,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(() => ResourceTags, (tag) => tag.id)
  // tags: ResourceTags[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
