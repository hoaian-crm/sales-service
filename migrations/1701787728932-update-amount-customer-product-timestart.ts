import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAmountCustomerProductTimestart1701787728932
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        alter table sales add product_id int references products (id);
        alter table sales add customer_id int references customers (id);
        alter table sales add amount int default 0;
        alter table sales add "timeStart" timestamp default NOW()
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    alter table sales drop column customer_id;
    alter table sales drop column product_id;
    alter table sales drop column amount;
    alter table sales drop column "timeStart";
    `);
  }
}
