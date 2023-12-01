import { MigrationInterface, QueryRunner } from 'typeorm';

export class Customer1701267400879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists customers (
            id serial,
            name text not null,
            email text not null,
            phone text not null,
            age int not null,
            address text,
            identify text,
            note text,
            "createdAt" timestamp not null default NOW(),
            "updatedAt" timestamp not null default NOW(),
            unique(email),
            unique(identify)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
