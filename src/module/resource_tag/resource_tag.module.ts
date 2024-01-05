import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceTags } from './resource_tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceTags])],
})
export class ResourceTagModule {}
