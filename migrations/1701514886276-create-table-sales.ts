import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSales1701514886276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
    create table if not exists sales (
        id serial,
        status text,
        "createdAt" timestamp default NOW(),
        "updatedAt" timestamp default NOW(),
        primary key (id)
    )
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
